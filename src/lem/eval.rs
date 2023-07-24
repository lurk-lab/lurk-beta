use crate::func;

use super::Func;

/// Lurk's step function
#[allow(dead_code)]
pub(crate) fn eval_step() -> Func {
    let reduce = reduce();
    let apply_cont = apply_cont();
    let make_thunk = make_thunk();

    func!((expr, env, cont): 3 => {
        let (expr, env, cont, ctrl) = reduce(expr, env, cont);
        let (expr, env, cont, ctrl) = apply_cont(expr, env, cont, ctrl);
        let (expr, env, cont, _ctrl) = make_thunk(expr, env, cont, ctrl);
        return (expr, env, cont)
    })
}

fn safe_uncons() -> Func {
    func!((xs): 2 => {
        match xs.tag {
            Nil => {
                return (xs, xs)
            }
            Cons => {
                let (car, cdr) = unhash2(xs);
                return (car, cdr)
            }
            Str => {
                let (car, cdr) = unhash2(xs);
                return (car, cdr)
            }
        }
    })
}

fn make_tail_continuation() -> Func {
    func!((env, continuation): 1 => {
        match continuation.tag {
            Tail => {
                return (continuation);
            }
        };
        let tail_continuation: Tail = hash2(env, continuation);
        return (tail_continuation);
    })
}

fn reduce() -> Func {
    // Auxiliary functions
    let safe_uncons = safe_uncons();
    let env_to_use = func!((smaller_env, smaller_rec_env): 1 => {
        match smaller_rec_env.tag {
            Nil => {
                return (smaller_env)
            }
        };
        let env: Cons = hash2(smaller_rec_env, smaller_env);
        return (env)
    });
    let extract_arg = func!((args): 2 => {
        match args.tag {
            Nil => {
                let dummy = Symbol("dummy");
                let nil: Nil;
                return (dummy, nil)
            }
            Cons => {
                let (arg, rest) = unhash2(args);
                return (arg, rest)
            }
        }
    });
    let expand_bindings = func!((head, body, body1, rest_bindings): 1 => {
        match rest_bindings.tag {
            Nil => {
                return (body1)
            }
        };
        let expanded_0: Cons = hash2(rest_bindings, body);
        let expanded: Cons = hash2(head, expanded_0);
        return (expanded)
    });
    let choose_let_cont = func!((head, var, env, expanded, cont): 1 => {
        match head.symbol {
            "let" => {
                let cont: Let = hash4(var, env, expanded, cont);
                return (cont)
            }
            "letrec" => {
                let cont: LetRec = hash4(var, env, expanded, cont);
                return (cont)
            }
        }
    });
    // TODO these `choose_unop` and `choose_binop` functions might
    // be unnecessary. Instead of passing tags, we could pass the
    // symbols themselves to the continuation
    let choose_unop = func!((head): 1 => {
        match head.symbol {
            "car" => {
                let op: Car;
                return (op)
            }
            "cdr" => {
                let op: Cdr;
                return (op)
            }
            "commit" => {
                let op: Commit;
                return (op)
            }
            "num" => {
                let op: Num;
                return (op)
            }
            "u64" => {
                let op: U64;
                return (op)
            }
            "comm" => {
                let op: Comm;
                return (op)
            }
            "char" => {
                let op: Char;
                return (op)
            }
            "open" => {
                let op: Open;
                return (op)
            }
            "secret" => {
                let op: Secret;
                return (op)
            }
            "atom" => {
                let op: Atom;
                return (op)
            }
            "emit" => {
                let op: Emit;
                return (op)
            }
        };
        let dummy = Symbol("dummy");
        return (dummy)
    });

    let choose_binop = func!((head): 1 => {
        match head.symbol {
            "cons" => {
                let op: Cons;
                return (op)
            }
            "strcons" => {
                let op: StrCons;
                return (op)
            }
            "hide" => {
                let op: Hide;
                return (op)
            }
            "+" => {
                let op: Sum;
                return (op)
            }
            "-" => {
                let op: Diff;
                return (op)
            }
            "*" => {
                let op: Product;
                return (op)
            }
            // TODO: bellperson complains if we use "/"
            "div" => {
                let op: Quotient;
                return (op)
            }
            "%" => {
                let op: Modulo;
                return (op)
            }
            "=" => {
                let op: NumEqual;
                return (op)
            }
            "eq" => {
                let op: Equal;
                return (op)
            }
            "<" => {
                let op: Less;
                return (op)
            }
            ">" => {
                let op: Greater;
                return (op)
            }
            "<=" => {
                let op: LessEqual;
                return (op)
            }
            ">=" => {
                let op: GreaterEqual;
                return (op)
            }
        };
        let dummy = Symbol("dummy");
        return (dummy)
    });

    func!((expr, env, cont): 4 => {
        // Useful constants
        let ret: Return;
        let apply: ApplyContinuation;
        let makethunk: MakeThunk;
        let err: Error;
        let nil: Nil;

        match cont.tag {
            Terminal | Error => {
                return (expr, env, cont, ret)
            }
        };


        match expr.tag {
            Nil | Fun | Num | Str | Char | Comm | U64 | Key => {
                return (expr, env, cont, apply)
            }
            Thunk => {
                let (thunk_expr, thunk_continuation) = unhash2(expr);
                return (thunk_expr, env, thunk_continuation, makethunk)
            }
            Sym => {
                match expr.symbol {
                    "nil" | "t" => {
                        return (expr, env, cont, apply)
                    }
                };

                match env.tag {
                    Nil => {
                        return (expr, env, err, err)
                    }
                };

                let (binding, smaller_env) = safe_uncons(env);
                match binding.tag {
                    Nil => {
                        return (expr, env, err, err)
                    }
                };

                let (var_or_rec_binding, val_or_more_rec_env) =
                    safe_uncons(binding);
                match var_or_rec_binding.tag {
                    Sym => {
                        if var_or_rec_binding == expr {
                            return (val_or_more_rec_env, env, cont, apply)
                        }
                        match cont.tag {
                            Lookup => {
                                return (expr, smaller_env, cont, ret)
                            }
                        };
                        let cont: Lookup = hash2(env, cont);
                        return (expr, smaller_env, cont, ret)
                    }
                    Cons => {
                        let (v2, val2) = safe_uncons(var_or_rec_binding);

                        if v2 == expr {
                            match val2.tag {
                                Fun => {
                                    // if `val2` is a closure, then extend its environment
                                    let (arg, body, closed_env) = unhash3(val2);
                                    let extended: Cons = hash2(binding, closed_env);
                                    // and return the extended closure
                                    let fun: Fun = hash3(arg, body, extended);
                                    return (fun, env, cont, apply)
                                }
                            };
                            // otherwise return `val2`
                            return (val2, env, cont, apply)
                        }
                        let (env_to_use) = env_to_use(smaller_env, val_or_more_rec_env);

                        match cont.tag {
                            Lookup => {
                                return (expr, env_to_use, cont, ret)
                            }
                        };
                        let cont: Lookup = hash2(env, cont);
                        return (expr, env_to_use, cont, ret)
                    }
                }
            }
            Cons => {
                // No need for `safe_uncons` since the expression is already a `Cons`
                let (head, rest) = unhash2(expr);
                match head.symbol {
                    "lambda" => {
                        let (args, body) = safe_uncons(rest);
                        let (arg, cdr_args) = extract_arg(args);

                        match arg.tag {
                            Sym => {
                                match cdr_args.tag {
                                    Nil => {
                                        let function: Fun = hash3(arg, body, env);
                                        return (function, env, cont, apply)
                                    }
                                };
                                let inner: Cons = hash2(cdr_args, body);
                                let lambda = Symbol("lambda");
                                let l: Cons = hash2(lambda, inner);
                                let inner_body: Cons = hash2(l, nil);
                                let function: Fun = hash3(arg, inner_body, env);
                                return (function, env, cont, apply)
                            }
                        };
                        return (expr, env, err, err)
                    }
                    "quote" => {
                        let (quoted, end) = safe_uncons(rest);

                        match end.tag {
                            Nil => {
                                return (quoted, env, cont, apply)
                            }
                        };
                        return (expr, env, err, err)
                    }
                    "let" | "letrec" => {
                        let (bindings, body) = safe_uncons(rest);
                        let (body1, rest_body) = safe_uncons(body);
                        // Only a single body form allowed for now.
                        match body.tag {
                            Nil => {
                                return (expr, env, err, err)
                            }
                        };
                        match rest_body.tag {
                            Nil => {
                                match bindings.tag {
                                    Nil => {
                                        return (body1, env, cont, ret)
                                    }
                                };
                                let (binding1, rest_bindings) = safe_uncons(bindings);
                                let (var, vals) = safe_uncons(binding1);
                                match var.tag {
                                    Sym => {
                                        let (val, end) = safe_uncons(vals);
                                        match end.tag {
                                            Nil => {
                                                let (expanded) = expand_bindings(head, body, body1, rest_bindings);
                                                let (cont) = choose_let_cont(head, var, env, expanded, cont);
                                                return (val, env, cont, ret)
                                            }
                                        };
                                        return (expr, env, err, err)
                                    }
                                };
                                return (expr, env, err, err)
                            }
                        };
                        return (expr, env, err, err)
                    }
                    "begin" => {
                        let (arg1, more) = safe_uncons(rest);
                        match more.tag {
                            Nil => {
                                return (arg1, env, cont, ret)
                            }
                        };
                        let op2: Begin;
                        let cont: Binop = hash4(op2, env, more, cont);
                        return (arg1, env, cont, ret)
                    }
                    "eval" => {
                        match rest.tag {
                            Nil => {
                                return (expr, env, err, err)
                            }
                        };
                        let (arg1, more) = safe_uncons(rest);
                        match more.tag {
                            Nil => {
                                let op1: Eval;
                                let cont: Unop = hash2(op1, cont);
                                return (arg1, env, cont, ret)
                            }
                        };
                        let op2: Eval;
                        let cont: Binop = hash4(op2, env, more, cont);
                        return (arg1, env, cont, ret)
                    }
                    "if" => {
                        let (condition, more) = safe_uncons(rest);
                        match more.tag {
                            Nil => {
                                return (condition, env, err, err)
                            }
                        };
                        let cont: If = hash2(more, cont);
                        return (condition, env, cont, ret)
                    }
                    "current-env" => {
                        match rest.tag {
                            Nil => {
                                return (env, env, cont, apply)
                            }
                        };
                        return (expr, env, err, err)
                    }
                };
                // unops
                let (op) = choose_unop(head);
                // TODO this is a hack since if statements only look at the hash
                // value, not the tag, as of now. Later, it might be that we decouple
                // hashes and tags
                let dummy = Symbol("dummy");
                if op != dummy {
                    match rest.tag {
                        Nil => {
                            return (expr, env, err, err)
                        }
                    };
                    let (arg1, end) = unhash2(rest);
                    match end.tag {
                        Nil => {
                            let cont: Unop = hash2(op, cont);
                            return (arg1, env, cont, ret)
                        }
                    };
                    return (expr, env, err, err)
                }
                // binops
                let (_op) = choose_binop(head);
                if op != dummy {
                    match rest.tag {
                        Nil => {
                            return (expr, env, err, err)
                        }
                    };
                    let (arg1, more) = unhash2(rest);
                    match more.tag {
                        Nil => {
                            return (expr, env, err, err)
                        }
                    };
                    let cont: Binop = hash4(op, env, more, cont);
                    return (arg1, env, cont, ret)
                }

                // TODO coprocessors (could it be simply a `func`?)
                // head -> fn, rest -> args
                match head.tag {
                    Fun => {
                        match rest.tag {
                            Nil => {
                                let cont: Call0 = hash2(env, cont);
                                return (head, env, cont, ret)
                            }
                            Cons => {
                                let (arg, more_args) = unhash2(rest);
                                match more_args.tag {
                                    Nil => {
                                        let cont: Call = hash3(arg, env, cont);
                                        return (head, env, cont, ret)
                                    }
                                };
                                let expanded_inner0: Cons = hash2(arg, nil);
                                let expanded_inner: Cons = hash2(head, expanded_inner0);
                                let expanded: Cons = hash2(expanded_inner, more_args);
                                return (expanded, env, cont, ret)
                            }
                        }
                    }
                };
                return (expr, env, err, err)
            }
        }
    })
}

fn apply_cont() -> Func {
    let safe_uncons = safe_uncons();
    let make_tail_continuation = make_tail_continuation();
    let extend_rec = func!((env, var, result): 1 => {

        let (binding_or_env, rest) = unhash2(env);
        let (var_or_binding, _val_or_more_bindings) = unhash2(binding_or_env);
        let cons: Cons = hash2(var, result);
        match var_or_binding.tag {
            // It's a var, so we are extending a simple env with a recursive env.
            Sym | Nil => {
                let nil: Nil;
                let list: Cons = hash2(cons, nil);
                let res: Cons = hash2(list, env);
                return (res)
            }
            // It's a binding, so we are extending a recursive env.
            Cons => {
                let cons2: Cons = hash2(cons, binding_or_env);
                let res: Cons = hash2(cons2, rest);

                return (res)
            }
        }
    });
    let run_binop = func!((_operator, _result, _evaled_arg, _env, _continuation): 2 => {
        // TODO
        let nil: Nil;
        return (nil, nil)
    });
    func!((result, env, cont, ctrl): 4 => {
        // Useful constants
        let ret: Return;
        let makethunk: MakeThunk;
        let err: Error;
        let nil: Nil;
        let t = Symbol("t");

        match ctrl.tag {
            ApplyContinuation => {
                match cont.tag {
                    Terminal | Error => {
                        return (result, env, cont, ret)
                    }
                    Outermost => {
                        let cont: Terminal;
                        return (result, env, cont, ret)
                    }
                    Emit => {
                        // Instead of doing hash1 we can reuse a slot for hash2
                        let (cont, _rest) = unhash2(cont);
                        return (result, env, cont, makethunk)
                    }
                    Call0 => {
                        let (saved_env, continuation) = unhash2(cont);
                        match result.tag {
                            Fun => {
                                let (arg, body, closed_env) = unhash3(result);
                                match arg.symbol {
                                    "dummy" => {
                                        match body.tag {
                                            Nil => {
                                                return (result, env, err, err)
                                            }
                                        };
                                        let (body_form, end) = safe_uncons(body);
                                        match end.tag {
                                            Nil => {
                                                let (cont) = make_tail_continuation(saved_env, continuation);
                                                return (body_form, closed_env, cont, ret)
                                            }
                                        };
                                        return (result, env, err, err)
                                    }
                                };
                                return (result, env, continuation, ret)
                            }
                        };
                        return (result, env, err, err)
                    }
                    Call => {
                        match result.tag {
                            Fun => {
                                let (unevaled_arg, saved_env, continuation) = unhash3(cont);
                                let newer_cont: Call2 = hash3(result, saved_env, continuation);
                                return (unevaled_arg, env, newer_cont, ret)
                            }
                        };
                        return (result, env, err, err)
                    }
                    Call2 => {
                        let (function, saved_env, continuation) = unhash3(cont);
                        match function.tag {
                            Fun => {
                                let (arg, body, closed_env) = unhash3(function);
                                match arg.symbol {
                                    "dummy" => {
                                        return (result, env, err, err)
                                    }
                                };
                                match body.tag {
                                    Nil => {
                                        return (result, env, err, err)
                                    }
                                };
                                let (body_form, end) = unhash2(body);
                                match end.tag {
                                    Nil => {
                                        let binding: Cons = hash2(arg, result);
                                        let newer_env: Cons = hash2(binding, closed_env);
                                        let (cont) = make_tail_continuation(saved_env, continuation);
                                        return (body_form, newer_env, cont, ret)
                                    }
                                };
                                return (result, env, err, err)
                            }
                        };
                        return (result, env, err, err)
                    }
                    Let => {
                        let (var, body, saved_env, cont) = unhash4(cont);
                        let binding: Cons = hash2(var, result);
                        let extended_env: Cons = hash2(binding, env);
                        let (cont) = make_tail_continuation(saved_env, cont);
                        return (body, extended_env, cont, ret)
                    }
                    LetRec => {
                        let (var, body, saved_env, cont) = unhash4(cont);
                        let (extended_env) = extend_rec(env, var, result);
                        let (cont) = make_tail_continuation(saved_env, cont);
                        return (body, extended_env, cont, ret)
                    }
                    Unop => {
                        let (operator, continuation) = unhash2(cont);
                        match operator.tag {
                            Car => {
                                let (car, _cdr) = unhash2(result);
                                return (car, env, continuation, makethunk)
                            }
                            Cdr => {
                                let (_car, cdr) = unhash2(result);
                                return (cdr, env, continuation, makethunk)
                            }
                            Atom => {
                                match result.tag {
                                    Cons => {
                                        return (nil, env, continuation, makethunk)
                                    }
                                };
                                return (t, env, continuation, makethunk)
                            }
                            Emit => {
                                let emit: Emit = hash2(cont, nil);
                                return (result, env, emit, makethunk)
                            }
                            Open => {
                                let (_secret, payload) = open(result);
                                return(payload, env, continuation, makethunk)
                            }
                            Secret => {
                                let (secret, _payload) = open(result);
                                return(secret, env, continuation, makethunk)
                            }
                            Commit => {
                                // TODO: although this works, since `let nil: Nil` has
                                // hash `F::ZERO`, maybe we should have an explicit
                                // operation for setting variables particular values
                                let nil: Nil;
                                let comm = hide(nil, result);
                                return(comm, env, continuation, makethunk)
                            }
                            Num => {
                                // TODO
                                return(result, env, err, err)
                            }
                            U64 => {
                                // TODO
                                return(result, env, err, err)
                            }
                            Comm => {
                                // TODO
                                return(result, env, err, err)
                            }
                            Char => {
                                // TODO
                                return(result, env, err, err)
                            }
                            Eval => {
                                // TODO
                                return(result, env, err, err)
                            }
                        };
                        return (result, env, err, err)
                    }
                    Binop => {
                        let (operator, saved_env, unevaled_args, continuation) = unhash4(cont);
                        let (arg2, rest) = safe_uncons(unevaled_args);
                        match operator.tag {
                            Begin => {
                                match rest.tag {
                                    Nil => {
                                        return (arg2, saved_env, continuation, ret)
                                    }
                                };
                                let begin = Symbol("begin");
                                let begin_again: Cons = hash2(begin, unevaled_args);
                                return (begin_again, saved_env, continuation, ctrl)
                            }
                        };
                        match rest.tag {
                            Nil => {
                                let cont: Binop2 = hash3(operator, result, continuation);
                                return (arg2, saved_env, cont, ret)
                            }
                        };
                        return (result, env, err, err)
                    }
                    Binop2 => {
                        let (operator, evaled_arg, continuation) = unhash3(cont);
                        let (val, success) = run_binop(operator, result, evaled_arg, env, continuation);
                        if success == nil {
                            return (result, env, err, err)
                        }
                        return (val, env, continuation, makethunk)
                    }
                    If => {
                        let (unevaled_args, continuation) = unhash2(cont);
                        let (arg1, more) = safe_uncons(unevaled_args);
                        let (arg2, end) = safe_uncons(more);
                        match end.tag {
                            Nil => {
                                match result.tag {
                                    Nil => {
                                        return (arg2, env, continuation, ret)
                                    }
                                };
                                return (arg1, env, continuation, ret)
                            }
                        };
                        return (result, env, err, err)
                    }
                    Lookup => {
                        let (saved_env, continuation) = unhash2(cont);
                        return (result, saved_env, continuation, makethunk)
                    }
                    Tail => {
                        let (saved_env, continuation) = unhash2(cont);
                        return (result, saved_env, continuation, makethunk)
                    }
                }
            }
        };
        return (result, env, cont, ctrl)
    })
}

fn make_thunk() -> Func {
    func!((expr, env, cont, ctrl): 4 => {
        let ret: Return;
        match ctrl.tag {
            MakeThunk => {
                match cont.tag {
                    Tail => {
                        let (saved_env, saved_cont) = unhash2(cont);
                        let thunk: Thunk = hash2(expr, saved_cont);
                        let cont: Dummy;
                        return (thunk, saved_env, cont, ret)
                    }
                    Outermost => {
                        let cont: Terminal;
                        return (expr, env, cont, ret)
                    }
                };
                let thunk: Thunk = hash2(expr, cont);
                let cont: Dummy;
                return (thunk, env, cont, ret)
            }
        };
        return (expr, env, cont, ctrl)
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::field::LurkField;
    use crate::lem::{
        circuit::SlotsCounter, pointers::Ptr, store::Store, symbol::Symbol, tag::Tag,
    };
    use bellperson::util_cs::{test_cs::TestConstraintSystem, Comparable};
    use blstrs::Scalar as Fr;

    // const NUM_INPUTS: usize = 1;
    // const NUM_AUX: usize = 111;
    // const NUM_CONSTRAINTS: usize = 258;
    // const NUM_SLOTS: SlotsCounter = SlotsCounter {
    //     hash2: 0,
    //     hash3: 0,
    //     hash4: 0,
    // };

    fn test_eval_and_constrain_aux(store: &mut Store<Fr>, pairs: Vec<(Ptr<Fr>, Ptr<Fr>)>) {
        let eval_step = eval_step();

        let slots_count = eval_step.body.count_slots();

        // assert_eq!(slots_count, NUM_SLOTS);
        eprintln!("SLOTS_COUNT: {:?}", slots_count);

        let computed_num_constraints = eval_step.num_constraints::<Fr>(&slots_count, store);

        let mut all_paths = vec![];

        // Auxiliary Lurk constants
        let outermost = Ptr::null(Tag::Outermost);
        let terminal = Ptr::null(Tag::Terminal);
        let error = Ptr::null(Tag::Error);
        let nil = store.intern_symbol(&Symbol::lurk_sym("nil"));

        // Stop condition: the continuation is either terminal or error
        let stop_cond = |output: &[Ptr<Fr>]| output[2] == terminal || output[2] == error;

        for (expr_in, expr_out) in pairs {
            let input = vec![expr_in, nil, outermost];
            let (frames, paths) = eval_step.call_until(input, store, stop_cond).unwrap();
            assert!(
                frames
                    .last()
                    .expect("eval should add at least one frame")
                    .output[0]
                    == expr_out
            );
            store.hydrate_z_cache();
            let mut cs = TestConstraintSystem::<Fr>::new();
            for frame in frames.iter() {
                eval_step
                    .synthesize(&mut cs, store, &slots_count, frame)
                    .unwrap();
                assert!(cs.is_satisfied());
                // assert_eq!(cs.num_inputs(), NUM_INPUTS);
                eprintln!("VARIABLES: {}", cs.aux().len());

                let num_constraints = cs.num_constraints();
                assert_eq!(computed_num_constraints, num_constraints);
                eprintln!("CONSTRAINTS: {}", num_constraints);
                // TODO: assert uniformity with `Delta` from bellperson
            }
            all_paths.extend(paths);
        }

        // TODO do we really need this?
        // eval_step.assert_all_paths_taken(&all_paths);
        assert!(false)
    }

    fn expr_in_expr_out_pairs(_store: &mut Store<Fr>) -> Vec<(Ptr<Fr>, Ptr<Fr>)> {
        let num = Ptr::num(Fr::from_u64(42));
        let nil = Ptr::null(Tag::Nil);
        let strnil = Ptr::null(Tag::Str);
        vec![(num, num), (nil, nil), (strnil, strnil)]
    }

    #[test]
    fn test_pairs() {
        let mut store = Store::default();
        let pairs = expr_in_expr_out_pairs(&mut store);
        store.hydrate_z_cache();
        test_eval_and_constrain_aux(&mut store, pairs);
    }
}
