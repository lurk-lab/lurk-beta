use abomonation::Abomonation;
use anyhow::Result;
use bellpepper::util_cs::witness_cs::WitnessCS;
use bellpepper_core::{num::AllocatedNum, Circuit, ConstraintSystem, SynthesisError};
use elsa::sync::FrozenMap;
use ff::PrimeField;
use nova::{supernova::NonUniformCircuit, traits::Group};
use rayon::prelude::*;
use std::sync::Arc;

use crate::{
    circuit::gadgets::pointer::AllocatedPtr,
    config::lurk_config,
    coprocessor::Coprocessor,
    error::{ProofError, ReductionError},
    eval::{lang::Lang, Meta},
    field::LurkField,
    proof::{
        nova::{CurveCycleEquipped, G1, G2},
        supernova::{FoldingConfig, C2},
        CEKState, EvaluationStore, FrameLike, MultiFrameTrait, Provable,
    },
    store,
    tag::ContTag,
};

use super::{
    circuit::{allocate_slot, BoundAllocations, GlobalAllocator, SlotWitness},
    eval::{evaluate_with_env_and_cont, make_cprocs_funcs_from_lang, make_eval_step_from_lang},
    interpreter::Frame,
    pointers::Ptr,
    slot::SlotType,
    store::Store,
    Func, Tag,
};

#[derive(Clone, Debug)]
pub struct MultiFrame<'a, F: LurkField, C: Coprocessor<F>> {
    store: Option<&'a Store<F>>,
    /// Cached Lurk step function according to the `folding_config`
    lurk_step: Arc<Func>,
    /// Cached coprocessor functions according to the `folding_config`. Holds
    /// `None` in case of IVC
    cprocs: Option<Arc<[Func]>>,
    input: Option<Vec<Ptr<F>>>,
    output: Option<Vec<Ptr<F>>>,
    frames: Option<Vec<Frame<F>>>,
    cached_witness: Option<WitnessCS<F>>,
    reduction_count: usize,
    folding_config: Arc<FoldingConfig<F, C>>,
    pc: usize,
    next_pc: usize,
}

impl<'a, F: LurkField, C: Coprocessor<F>> MultiFrame<'a, F, C> {
    fn get_func(&self) -> &Func {
        if self.pc == 0 {
            &self.lurk_step
        } else {
            &self.cprocs.as_ref().unwrap()[self.pc - 1]
        }
    }

    #[inline]
    fn get_lang(&self) -> &Lang<F, C> {
        self.folding_config.lang()
    }
}

impl<F: LurkField> CEKState<Ptr<F>, Ptr<F>> for Vec<Ptr<F>> {
    fn expr(&self) -> &Ptr<F> {
        &self[0]
    }
    fn env(&self) -> &Ptr<F> {
        &self[1]
    }
    fn cont(&self) -> &Ptr<F> {
        &self[2]
    }
}

impl<F: LurkField> FrameLike<Ptr<F>, Ptr<F>> for Frame<F> {
    type FrameIO = Vec<Ptr<F>>;
    fn input(&self) -> &Self::FrameIO {
        &self.input
    }
    fn output(&self) -> &Self::FrameIO {
        &self.output
    }
}

impl<F: LurkField> EvaluationStore for Store<F> {
    type Ptr = Ptr<F>;
    type ContPtr = Ptr<F>;
    type Error = anyhow::Error;

    fn read(&self, expr: &str) -> Result<Self::Ptr, Self::Error> {
        self.read_with_default_state(expr)
    }

    fn initial_empty_env(&self) -> Self::Ptr {
        self.intern_nil()
    }

    fn get_cont_terminal(&self) -> Self::ContPtr {
        self.cont_terminal()
    }

    fn hydrate_z_cache(&self) {
        self.hydrate_z_cache()
    }

    fn ptr_eq(&self, left: &Self::Ptr, right: &Self::Ptr) -> bool {
        self.ptr_eq(left, right)
    }
}

/// Checks that a slice of pointers and a slice of allocated pointers have
/// the same length. If `!blank`, asserts that the hashed pointers have tags
/// and values corresponding to the ones from the respective allocated pointers
fn assert_eq_ptrs_aptrs<F: LurkField>(
    store: &Store<F>,
    blank: bool,
    ptrs: &[Ptr<F>],
    aptrs: &[AllocatedPtr<F>],
) -> Result<(), SynthesisError> {
    assert_eq!(ptrs.len(), aptrs.len());
    if !blank {
        for (aptr, ptr) in aptrs.iter().zip(ptrs) {
            let z_ptr = store.hash_ptr(ptr);
            let (Some(alloc_ptr_tag), Some(alloc_ptr_hash)) =
                (aptr.tag().get_value(), aptr.hash().get_value())
            else {
                return Err(SynthesisError::AssignmentMissing);
            };
            assert_eq!(alloc_ptr_tag, z_ptr.tag().to_field());
            assert_eq!(&alloc_ptr_hash, z_ptr.value());
        }
    }
    Ok(())
}

/// Generates the witnesses for all slots in `frames`. Since many slots are fed
/// with dummy data, we cache their (dummy) witnesses for extra speed
fn generate_slots_witnesses<F: LurkField>(
    store: &Store<F>,
    frames: &[Frame<F>],
    num_slots_per_frame: usize,
    parallel: bool,
) -> Vec<Arc<SlotWitness<F>>> {
    let mut slots_data = Vec::with_capacity(frames.len() * num_slots_per_frame);
    frames.iter().for_each(|frame| {
        [
            (&frame.hints.hash4, SlotType::Hash4),
            (&frame.hints.hash6, SlotType::Hash6),
            (&frame.hints.hash8, SlotType::Hash8),
            (&frame.hints.commitment, SlotType::Commitment),
            (&frame.hints.bit_decomp, SlotType::BitDecomp),
        ]
        .into_iter()
        .for_each(|(sd_vec, st)| sd_vec.iter().for_each(|sd| slots_data.push((sd, st))));
    });
    // cache dummy slots witnesses with `Arc` for speedy clones
    let dummy_witnesses_cache: FrozenMap<_, Box<Arc<SlotWitness<F>>>> = FrozenMap::default();
    let gen_slot_witness = |(slot_idx, (slot_data, slot_type))| {
        let mk_witness = || {
            let mut witness = WitnessCS::new();
            let allocations = allocate_slot(&mut witness, slot_data, slot_idx, slot_type, store)
                .expect("slot allocations failed");
            Arc::new(SlotWitness {
                witness,
                allocations,
            })
        };
        if Option::as_ref(slot_data).is_some() {
            mk_witness()
        } else {
            // dummy witness
            if let Some(sw) = dummy_witnesses_cache.get(&slot_type) {
                // already computed
                sw.clone()
            } else {
                // compute, cache and return
                let ws = mk_witness();
                dummy_witnesses_cache.insert(slot_type, Box::new(ws.clone()));
                ws
            }
        }
    };
    if parallel {
        slots_data
            .into_par_iter()
            .enumerate()
            .map(gen_slot_witness)
            .collect()
    } else {
        slots_data
            .into_iter()
            .enumerate()
            .map(gen_slot_witness)
            .collect()
    }
}

/// Synthesize frames sequentially, feeding the output of a frame as the input of
/// the next
fn synthesize_frames_sequential<F: LurkField, CS: ConstraintSystem<F>, C: Coprocessor<F>>(
    cs: &mut CS,
    g: &GlobalAllocator<F>,
    store: &Store<F>,
    input: &[AllocatedPtr<F>],
    frames: &[Frame<F>],
    func: &Func,
    lang: &Lang<F, C>,
    slots_witnesses_num_slots_per_frame: Option<(&[Arc<SlotWitness<F>>], usize)>,
) -> Result<Vec<AllocatedPtr<F>>, SynthesisError> {
    let (_, output) = frames
        .iter()
        .try_fold((0, input.to_vec()), |(i, input), frame| {
            let bound_allocations = &mut BoundAllocations::new();
            func.bind_input(&input, bound_allocations);
            let output = func
                .synthesize_frame(
                    &mut cs.namespace(|| format!("frame {i}")),
                    store,
                    frame,
                    g,
                    bound_allocations,
                    lang,
                    slots_witnesses_num_slots_per_frame.map(|(sws, num_slots_per_frame)| {
                        let slots_witnesses_start = i * num_slots_per_frame;
                        &sws[slots_witnesses_start..slots_witnesses_start + num_slots_per_frame]
                    }),
                )
                .expect("failed to synthesize frame");
            assert_eq!(input.len(), output.len());
            assert_eq_ptrs_aptrs(store, frame.blank, &frame.output, &output)?;
            Ok::<_, SynthesisError>((i + 1, output))
        })?;
    Ok(output)
}

/// Synthesize each frame in parallel, ideally one in each CPU. Each
/// frame will produce its corresponding partial witness, which are then
/// used to extend the final witness.
fn synthesize_frames_parallel<F: LurkField, CS: ConstraintSystem<F>, C: Coprocessor<F>>(
    cs: &mut CS,
    g: &GlobalAllocator<F>,
    store: &Store<F>,
    input: Vec<AllocatedPtr<F>>,
    frames: &[Frame<F>],
    func: &Func,
    lang: &Lang<F, C>,
    slots_witnesses: &[Arc<SlotWitness<F>>],
    num_slots_per_frame: usize,
) -> Vec<AllocatedPtr<F>> {
    assert!(cs.is_witness_generator());
    assert_eq!(frames.len() * num_slots_per_frame, slots_witnesses.len());

    let mut css = frames
        .par_iter()
        .enumerate()
        .map(|(i, frame)| {
            let mut frame_cs = WitnessCS::new();
            // The first frame will take as input the actual input of the circuit.
            // Subsequent frames would have to take the output of the previous one as input.
            // But since we know the values of each frame input and we are generating the
            // witnesses separately and in parallel, we will allocate new variables for each
            // frame.
            let allocated_input = if i == 0 {
                input.clone()
            } else {
                frame
                    .input
                    .iter()
                    .map(|input_ptr| {
                        let z_ptr = store.hash_ptr(input_ptr);
                        AllocatedPtr::alloc(&mut frame_cs, || Ok(z_ptr)).expect("allocation failed")
                    })
                    .collect::<Vec<_>>()
            };
            let bound_allocations = &mut BoundAllocations::new();
            func.bind_input(&allocated_input, bound_allocations);
            let first_sw_idx = i * num_slots_per_frame;
            let last_sw_idx = first_sw_idx + num_slots_per_frame;
            let frame_slots_witnesses = &slots_witnesses[first_sw_idx..last_sw_idx];

            let allocated_output = func
                .synthesize_frame(
                    &mut frame_cs,
                    store,
                    frame,
                    g,
                    bound_allocations,
                    lang,
                    Some(frame_slots_witnesses),
                )
                .expect("failed to synthesize frame");
            assert_eq!(allocated_input.len(), allocated_output.len());
            assert_eq_ptrs_aptrs(store, frame.blank, &frame.output, &allocated_output)
                .expect("assertion failed");
            (frame_cs, allocated_output)
        })
        .collect::<Vec<_>>();

    // At last, we need to concatenate all the partial witnesses into a single witness.
    // Since we have allocated the input for each frame (apart from the first) instead
    // of using the output of the previous frame, we will have to ignore the allocated
    // inputs before concatenating the witnesses
    for (i, (frame_cs, _)) in css.iter().enumerate() {
        let start = if i == 0 { 0 } else { input.len() * 2 };
        cs.extend_aux(&frame_cs.aux_slice()[start..]);
    }

    if let Some((_, last_output)) = css.pop() {
        // the final output is the output of the last chunk
        last_output
    } else {
        // there were no frames so we just return the input, preserving the
        // same behavior as the sequential version
        input
    }
}

impl<'a, F: LurkField, C: Coprocessor<F> + 'a> MultiFrameTrait<'a, F, C> for MultiFrame<'a, F, C> {
    type Ptr = Ptr<F>;
    type ContPtr = Ptr<F>;
    type Store = Store<F>;
    type StoreError = store::Error;
    type EvalFrame = Frame<F>;
    type CircuitFrame = Frame<F>;
    type GlobalAllocation = GlobalAllocator<F>;
    type AllocatedIO = Vec<AllocatedPtr<F>>;

    fn emitted(_store: &Store<F>, eval_frame: &Self::EvalFrame) -> Vec<Ptr<F>> {
        eval_frame.emitted.clone()
    }

    fn io_to_scalar_vector(
        store: &Self::Store,
        io: &<Self::EvalFrame as FrameLike<Ptr<F>, Ptr<F>>>::FrameIO,
    ) -> Vec<F> {
        store.to_scalar_vector(io)
    }

    fn compute_witness(&self, s: &Store<F>) -> WitnessCS<F> {
        let mut wcs = WitnessCS::new();

        let z_scalar = s.to_scalar_vector(self.input.as_ref().unwrap());

        let mut bogus_cs = WitnessCS::<F>::new();
        let z: Vec<AllocatedNum<F>> = z_scalar
            .iter()
            .map(|x| AllocatedNum::alloc(&mut bogus_cs, || Ok(*x)).unwrap())
            .collect::<Vec<_>>();

        let _ = nova::traits::circuit::StepCircuit::synthesize(self, &mut wcs, z.as_slice());

        wcs
    }

    fn cached_witness(&mut self) -> &mut Option<WitnessCS<F>> {
        &mut self.cached_witness
    }

    fn output(&self) -> &Option<<Self::EvalFrame as FrameLike<Ptr<F>, Ptr<F>>>::FrameIO> {
        &self.output
    }

    fn frames(&self) -> Option<&Vec<Self::CircuitFrame>> {
        self.frames.as_ref()
    }

    fn precedes(&self, maybe_next: &Self) -> bool {
        self.output == maybe_next.input
    }

    fn synthesize_frames<CS: ConstraintSystem<F>>(
        &self,
        cs: &mut CS,
        store: &Self::Store,
        input: Self::AllocatedIO,
        frames: &[Self::CircuitFrame],
        g: &Self::GlobalAllocation,
    ) -> Result<Self::AllocatedIO, SynthesisError> {
        let func = self.get_func();
        if cs.is_witness_generator() {
            let num_slots_per_frame = func.slots_count.total();
            let slots_witnesses = generate_slots_witnesses(
                store,
                frames,
                num_slots_per_frame,
                lurk_config(None, None)
                    .perf
                    .parallelism
                    .poseidon_witnesses
                    .is_parallel(),
            );
            if lurk_config(None, None)
                .perf
                .parallelism
                .synthesis
                .is_parallel()
            {
                Ok(synthesize_frames_parallel(
                    cs,
                    g,
                    store,
                    input,
                    frames,
                    func,
                    self.get_lang(),
                    &slots_witnesses,
                    num_slots_per_frame,
                ))
            } else {
                synthesize_frames_sequential(
                    cs,
                    g,
                    store,
                    &input,
                    frames,
                    func,
                    self.get_lang(),
                    Some((&slots_witnesses, num_slots_per_frame)),
                )
            }
        } else {
            synthesize_frames_sequential(cs, g, store, &input, frames, func, self.get_lang(), None)
        }
    }

    fn blank(folding_config: Arc<FoldingConfig<F, C>>, _meta: Meta<F>, pc: usize) -> Self {
        let (lurk_step, cprocs, rc) = match &*folding_config {
            FoldingConfig::IVC(lang, rc) => {
                (Arc::new(make_eval_step_from_lang(lang, true)), None, *rc)
            }
            FoldingConfig::NIVC(lang, rc) => (
                Arc::new(make_eval_step_from_lang(lang, false)),
                Some(make_cprocs_funcs_from_lang(lang)),
                *rc,
            ),
        };
        let reduction_count = if pc == 0 { rc } else { 1 };
        Self {
            store: None,
            lurk_step,
            cprocs,
            input: None,
            output: None,
            frames: None,
            cached_witness: None,
            reduction_count,
            folding_config,
            pc,
            next_pc: 0,
        }
    }

    fn from_frames(
        reduction_count: usize,
        frames: &[Frame<F>],
        store: &'a Self::Store,
        folding_config: &Arc<FoldingConfig<F, C>>,
    ) -> Vec<Self> {
        let total_frames = frames.len();
        let n = (total_frames + reduction_count - 1) / reduction_count;
        let mut multi_frames = Vec::with_capacity(n);
        match &**folding_config {
            FoldingConfig::IVC(lang, _) => {
                let lurk_step = Arc::new(make_eval_step_from_lang(lang, true));
                for chunk in frames.chunks(reduction_count) {
                    let output = chunk
                        .last()
                        .expect("chunk must not be empty")
                        .output
                        .to_vec();
                    let inner_frames = if chunk.len() < reduction_count {
                        let mut inner_frames = Vec::with_capacity(reduction_count);
                        inner_frames.extend(chunk.to_vec());
                        let padding_frame = lurk_step
                            .call_simple(&output, store, lang, 0)
                            .expect("reduction step failed");
                        assert_eq!(padding_frame.input, padding_frame.output);
                        inner_frames.resize(reduction_count, padding_frame.clone());
                        inner_frames
                    } else {
                        chunk.to_vec()
                    };

                    let mf = MultiFrame {
                        store: Some(store),
                        lurk_step: lurk_step.clone(),
                        cprocs: None,
                        input: Some(chunk[0].input.to_vec()),
                        output: Some(output),
                        frames: Some(inner_frames),
                        cached_witness: None,
                        reduction_count,
                        folding_config: folding_config.clone(),
                        pc: 0,
                        next_pc: 0,
                    };

                    multi_frames.push(mf);
                }
            }
            FoldingConfig::NIVC(lang, _) => {
                let lurk_step = Arc::new(make_eval_step_from_lang(lang, false));
                let cprocs = make_cprocs_funcs_from_lang(lang);
                let mut chunk_start_idx = 0;
                while chunk_start_idx < frames.len() {
                    let first_frame = &frames[chunk_start_idx];

                    // Variables occurring in both branches
                    let input = first_frame.input.clone();
                    let output: Vec<_>;
                    let frames_to_add: Vec<_>;
                    let mut reduction_count_to_use = reduction_count;
                    let mut pc = 0;
                    let mut next_pc = 0;

                    if first_frame.pc == 0 {
                        let mut inner_frames = Vec::with_capacity(reduction_count);
                        let chunk_start_idx_saved = chunk_start_idx;

                        // fill `inner_frames` with `reduction_count` frames unless
                        // we don't have enough frames or we find some frame whose
                        // `pc` is not `0` on the way
                        for i in 0..reduction_count {
                            let current_frame_idx = chunk_start_idx_saved + i;
                            inner_frames.push(frames[current_frame_idx].clone());
                            chunk_start_idx = current_frame_idx + 1;

                            if let Some(next_frame) = frames.get(chunk_start_idx) {
                                next_pc = next_frame.pc;
                                if next_pc != 0 {
                                    // incompatible `pc` incoming
                                    break;
                                }
                            } else {
                                // not enough frames
                                break;
                            }
                        }

                        output = inner_frames
                            .last()
                            .expect("empty inner_frames")
                            .output
                            .to_vec();

                        if inner_frames.len() < reduction_count {
                            let padding_frame = lurk_step
                                .call_simple(&output, store, lang, 0)
                                .expect("reduction step failed");
                            assert_eq!(padding_frame.input, padding_frame.output);
                            inner_frames.resize(reduction_count, padding_frame);
                        }

                        frames_to_add = inner_frames;
                    } else {
                        chunk_start_idx += 1;
                        output = first_frame.output.clone();
                        frames_to_add = vec![first_frame.clone()];
                        reduction_count_to_use = 1;
                        pc = first_frame.pc;
                    }

                    let mf = MultiFrame {
                        store: Some(store),
                        lurk_step: lurk_step.clone(),
                        cprocs: Some(cprocs.clone()),
                        input: Some(input),
                        output: Some(output),
                        frames: Some(frames_to_add),
                        cached_witness: None,
                        reduction_count: reduction_count_to_use,
                        folding_config: folding_config.clone(),
                        pc,
                        next_pc,
                    };

                    multi_frames.push(mf);
                }
            }
        }

        multi_frames
    }

    /// Make a dummy instance, duplicating `self`'s final `CircuitFrame`.
    fn make_dummy(
        reduction_count: usize,
        circuit_frame: Option<Self::CircuitFrame>,
        store: &'a Self::Store,
        folding_config: Arc<FoldingConfig<F, C>>,
        _meta: Meta<F>,
    ) -> Self {
        let (lurk_step, cprocs) = match &*folding_config {
            FoldingConfig::IVC(lang, _) => (Arc::new(make_eval_step_from_lang(lang, true)), None),
            FoldingConfig::NIVC(lang, _) => (
                Arc::new(make_eval_step_from_lang(lang, false)),
                Some(make_cprocs_funcs_from_lang(lang)),
            ),
        };
        let (frames, input, output) = if let Some(circuit_frame) = circuit_frame {
            (
                Some(vec![circuit_frame.clone(); reduction_count]),
                Some(circuit_frame.input),
                Some(circuit_frame.output),
            )
        } else {
            (None, None, None)
        };
        Self {
            store: Some(store),
            lurk_step,
            cprocs,
            input,
            output,
            frames,
            cached_witness: None,
            reduction_count,
            folding_config,
            pc: 0,
            next_pc: 0,
        }
    }

    fn get_evaluation_frames(
        _padding_predicate: impl Fn(usize) -> bool,
        expr: Self::Ptr,
        env: Self::Ptr,
        store: &Self::Store,
        limit: usize,
        lang: &Lang<F, C>,
    ) -> Result<Vec<Self::EvalFrame>, ProofError> {
        let cont = store.cont_outermost();
        let lurk_step = make_eval_step_from_lang(lang, true);
        match evaluate_with_env_and_cont(Some((&lurk_step, lang)), expr, env, cont, store, limit) {
            Ok((frames, _)) => Ok(frames),
            Err(e) => Err(ProofError::Reduction(ReductionError::Misc(e.to_string()))),
        }
    }

    fn significant_frame_count(frames: &[Self::EvalFrame]) -> usize {
        let stop_cond = |output: &[Ptr<F>]| {
            matches!(
                output[2].tag(),
                Tag::Cont(ContTag::Terminal) | Tag::Cont(ContTag::Error)
            )
        };
        frames
            .iter()
            .rev()
            .skip_while(|f| f.input == f.output && stop_cond(&f.output))
            .count()
    }
}

impl<'a, F: LurkField, C: Coprocessor<F>> Circuit<F> for MultiFrame<'a, F, C> {
    fn synthesize<CS: ConstraintSystem<F>>(self, cs: &mut CS) -> Result<(), SynthesisError> {
        let mut synth =
            |store: &Store<F>, frames: &[Frame<F>], input: &[Ptr<F>], output: &[Ptr<F>]| {
                let mut allocated_input = Vec::with_capacity(input.len());
                for (i, ptr) in input.iter().enumerate() {
                    let z_ptr = store.hash_ptr(ptr);

                    let allocated_tag = AllocatedNum::alloc_infallible(
                        &mut cs.namespace(|| format!("allocated tag for input {i}")),
                        || z_ptr.tag_field(),
                    );
                    allocated_tag
                        .inputize(&mut cs.namespace(|| format!("inputized tag for input {i}")))?;

                    let allocated_hash = AllocatedNum::alloc_infallible(
                        &mut cs.namespace(|| format!("allocated hash for input {i}")),
                        || *z_ptr.value(),
                    );
                    allocated_hash
                        .inputize(&mut cs.namespace(|| format!("inputized hash for input {i}")))?;

                    allocated_input.push(AllocatedPtr::from_parts(allocated_tag, allocated_hash));
                }

                let mut allocated_output = Vec::with_capacity(output.len());
                for (i, ptr) in output.iter().enumerate() {
                    let z_ptr = store.hash_ptr(ptr);

                    let allocated_tag = AllocatedNum::alloc_infallible(
                        &mut cs.namespace(|| format!("allocated tag for output {i}")),
                        || z_ptr.tag_field(),
                    );
                    allocated_tag
                        .inputize(&mut cs.namespace(|| format!("inputized tag for output {i}")))?;

                    let allocated_hash = AllocatedNum::alloc_infallible(
                        &mut cs.namespace(|| format!("allocated hash for output {i}")),
                        || *z_ptr.value(),
                    );
                    allocated_hash
                        .inputize(&mut cs.namespace(|| format!("inputized hash for output {i}")))?;

                    allocated_output.push(AllocatedPtr::from_parts(allocated_tag, allocated_hash));
                }

                let g = self.lurk_step.alloc_globals(cs, store)?;

                let allocated_output_result =
                    self.synthesize_frames(cs, store, allocated_input, frames, &g)?;

                assert_eq!(allocated_output.len(), allocated_output_result.len());

                for (i, (o_res, o)) in allocated_output_result
                    .iter()
                    .zip(allocated_output)
                    .enumerate()
                {
                    o_res.enforce_equal(
                        &mut cs.namespace(|| format!("outer output {i} is correct")),
                        &o,
                    );
                }

                Ok(())
            };

        match self.store {
            Some(store) => {
                let input = self
                    .input
                    .as_ref()
                    .ok_or_else(|| SynthesisError::AssignmentMissing)?;
                let output = self
                    .output
                    .as_ref()
                    .ok_or_else(|| SynthesisError::AssignmentMissing)?;
                let frames = self.frames.as_ref().unwrap();
                synth(store, frames, input, output)
            }
            None => {
                assert!(self.frames.is_none());
                let dummy_io = [Ptr::dummy(); 3];
                let store = Store::default();
                let blank_frame = Frame::blank(self.get_func(), self.pc);
                let frames = vec![blank_frame; self.reduction_count];
                synth(&store, &frames, &dummy_io, &dummy_io)
            }
        }
    }
}

impl<'a, F: LurkField, C: Coprocessor<F>> Provable<F> for MultiFrame<'a, F, C> {
    fn public_inputs(&self) -> Vec<F> {
        let input = self.input.as_ref().expect("input missing");
        let output = self.output.as_ref().expect("input missing");
        let store = self.store.expect("store missing");
        let mut res = Vec::with_capacity(self.public_input_size());
        for ptr in input {
            let z_ptr = store.hash_ptr(ptr);
            res.push(z_ptr.tag().to_field());
            res.push(*z_ptr.value());
        }
        for ptr in output {
            let z_ptr = store.hash_ptr(ptr);
            res.push(z_ptr.tag().to_field());
            res.push(*z_ptr.value());
        }
        res
    }

    #[inline]
    fn public_input_size(&self) -> usize {
        // tag and hash for input and output (output has the same size as the input)
        4 * self.lurk_step.input_params.len()
    }

    #[inline]
    fn reduction_count(&self) -> usize {
        self.reduction_count
    }
}

impl<'a, F: LurkField, C: Coprocessor<F>> nova::traits::circuit::StepCircuit<F>
    for MultiFrame<'a, F, C>
{
    fn arity(&self) -> usize {
        2 * self.lurk_step.input_params.len()
    }

    fn synthesize<CS>(
        &self,
        cs: &mut CS,
        z: &[AllocatedNum<F>],
    ) -> Result<Vec<AllocatedNum<F>>, SynthesisError>
    where
        CS: ConstraintSystem<F>,
    {
        assert_eq!(self.arity(), z.len());

        let n_ptrs = self.arity() / 2;
        let mut input = Vec::with_capacity(n_ptrs);
        for i in 0..n_ptrs {
            input.push(AllocatedPtr::from_parts(
                z[2 * i].clone(),
                z[2 * i + 1].clone(),
            ));
        }

        let output_ptrs = match self.frames.as_ref() {
            Some(frames) => {
                if self.pc != 0 {
                    assert_eq!(frames.len(), 1);
                }
                let store = self.store.expect("store missing");
                let g = self.lurk_step.alloc_globals(cs, store)?;
                self.synthesize_frames(cs, store, input, frames, &g)?
            }
            None => {
                assert!(self.store.is_none());
                let store = Store::default();
                let blank_frame = Frame::blank(self.get_func(), self.pc);
                let frames = vec![blank_frame; self.reduction_count];
                let g = self.lurk_step.alloc_globals(cs, &store)?;
                self.synthesize_frames(cs, &store, input, &frames, &g)?
            }
        };

        let mut output = Vec::with_capacity(self.arity());
        for ptr in output_ptrs {
            output.push(ptr.tag().clone());
            output.push(ptr.hash().clone());
        }

        Ok(output)
    }
}

impl<'a, F: LurkField, C: Coprocessor<F>> nova::traits::circuit_supernova::StepCircuit<F>
    for MultiFrame<'a, F, C>
{
    fn arity(&self) -> usize {
        2 * self.lurk_step.input_params.len()
    }

    fn synthesize<CS: ConstraintSystem<F>>(
        &self,
        cs: &mut CS,
        _pc: Option<&AllocatedNum<F>>,
        z: &[AllocatedNum<F>],
    ) -> Result<(Option<AllocatedNum<F>>, Vec<AllocatedNum<F>>), SynthesisError> {
        let next_pc = AllocatedNum::alloc_infallible(&mut cs.namespace(|| "next_pc"), || {
            F::from_u64(self.next_pc as u64)
        });
        let output = <MultiFrame<'_, F, C> as nova::traits::circuit::StepCircuit<F>>::synthesize(
            self, cs, z,
        )?;
        Ok((Some(next_pc), output))
    }

    fn circuit_index(&self) -> usize {
        self.pc
    }
}

impl<'a, F, C> NonUniformCircuit<G1<F>, G2<F>, MultiFrame<'a, F, C>, C2<F>> for MultiFrame<'a, F, C>
where
    F: CurveCycleEquipped + LurkField,
    C: Coprocessor<F> + 'a,
    <<G1<F> as Group>::Scalar as PrimeField>::Repr: Abomonation,
    <<G2<F> as Group>::Scalar as PrimeField>::Repr: Abomonation,
{
    fn num_circuits(&self) -> usize {
        assert_eq!(self.pc, 0);
        self.get_lang().coprocessor_count() + 1
    }

    fn primary_circuit(&self, circuit_index: usize) -> MultiFrame<'a, F, C> {
        if circuit_index == 0 {
            self.clone()
        } else {
            Self::blank(
                self.folding_config.clone(),
                Default::default(),
                circuit_index,
            )
        }
    }

    fn secondary_circuit(&self) -> C2<F> {
        Default::default()
    }
}

#[cfg(test)]
mod tests {
    use pasta_curves::Fq;

    use crate::{
        eval::lang::Coproc,
        lem::{
            circuit::AllocatedVal,
            eval::{eval_step, evaluate},
        },
    };

    use super::*;

    #[test]
    fn test_sequential_and_parallel_witnesses_equivalences() {
        let lurk_step = eval_step();
        let num_slots_per_frame = lurk_step.slots_count.total();
        let store = Store::<Fq>::default();
        let mut cs = WitnessCS::new();

        let expr = store.read_with_default_state("(if t (+ 5 5) 6)").unwrap();

        let (frames, _) = evaluate::<Fq, Coproc<Fq>>(None, expr, &store, 10).unwrap();

        let sequential_slots_witnesses =
            generate_slots_witnesses(&store, &frames, num_slots_per_frame, false);

        let parallel_slots_witnesses =
            generate_slots_witnesses(&store, &frames, num_slots_per_frame, true);

        // asserting equality of slots witnesses
        assert_eq!(
            sequential_slots_witnesses.len(),
            parallel_slots_witnesses.len()
        );
        for (ssw, psw) in sequential_slots_witnesses
            .iter()
            .zip(parallel_slots_witnesses)
        {
            assert_eq!(ssw.witness, psw.witness);
            let (ssw_alloc_preimg, ssw_alloc_img) = &ssw.allocations;
            let (psw_alloc_preimg, psw_alloc_img) = &psw.allocations;
            assert_eq!(ssw_alloc_preimg.len(), psw_alloc_preimg.len());
            for (ssw_alloc_preimg_num, psw_alloc_preimg_num) in
                ssw_alloc_preimg.iter().zip(psw_alloc_preimg)
            {
                assert_eq!(
                    ssw_alloc_preimg_num.get_value(),
                    psw_alloc_preimg_num.get_value()
                );
                match (ssw_alloc_img, psw_alloc_img) {
                    (AllocatedVal::Pointer(x), AllocatedVal::Pointer(y)) => {
                        assert_eq!(x.tag().get_value(), y.tag().get_value());
                        assert_eq!(x.hash().get_value(), y.hash().get_value());
                    }
                    (AllocatedVal::Number(x), AllocatedVal::Number(y)) => {
                        assert_eq!(x.get_value(), y.get_value())
                    }
                    (AllocatedVal::Boolean(x), AllocatedVal::Boolean(y)) => {
                        assert_eq!(x.get_value(), y.get_value())
                    }
                    (AllocatedVal::Bits(x), AllocatedVal::Bits(y)) => {
                        assert_eq!(x.len(), y.len());
                        for (x, y) in x.iter().zip(y) {
                            assert_eq!(x.get_value(), y.get_value());
                        }
                    }
                    _ => panic!("allocated image mismatch"),
                }
            }
        }
        let g = lurk_step.alloc_globals(&mut cs, &store).unwrap();

        // asserting equality of frames witnesses
        let frame = frames.first().unwrap();
        let mut input = Vec::with_capacity(frame.input.len());
        for ptr in &frame.input {
            let z_ptr = store.hash_ptr(ptr);
            let allocated_tag = AllocatedNum::alloc_infallible(&mut cs, || z_ptr.tag_field());
            allocated_tag.inputize(&mut cs).unwrap();
            let allocated_hash = AllocatedNum::alloc_infallible(&mut cs, || *z_ptr.value());
            allocated_hash.inputize(&mut cs).unwrap();
            input.push(AllocatedPtr::from_parts(allocated_tag, allocated_hash));
        }

        let mut cs_clone = cs.clone();

        let lang = Lang::<Fq, Coproc<Fq>>::new();

        let output_sequential = synthesize_frames_sequential(
            &mut cs,
            &g,
            &store,
            &input,
            &frames,
            lurk_step,
            &lang,
            Some((&sequential_slots_witnesses, num_slots_per_frame)),
        )
        .unwrap();

        let output_parallel = synthesize_frames_parallel(
            &mut cs_clone,
            &g,
            &store,
            input,
            &frames,
            lurk_step,
            &lang,
            &sequential_slots_witnesses,
            num_slots_per_frame,
        );

        assert_eq!(cs, cs_clone);
        assert_eq!(output_sequential.len(), output_parallel.len());
        for (x, y) in output_sequential.iter().zip(output_parallel) {
            assert_eq!(x.tag().get_value(), y.tag().get_value());
            assert_eq!(x.hash().get_value(), y.hash().get_value());
        }
    }
}
