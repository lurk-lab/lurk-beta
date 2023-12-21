//! # Usage of circom coprocessors.
//!
//! See `examples/circom.rs` for a quick example of how to declare a circom coprocessor.
use crate::{
    field::LurkField,
    lem::{pointers::Ptr, store::Store},
};

use super::pointer::AllocatedPtr;

/// An interface to declare a new type of Circom gadget.
/// It requires 3 things:
///  1. The user defined reference of the gadget. This _must_ have a format of <AUTHOR>/<NAME>.
///     The reference _must_ either exist into the  file system (loaded via the CLI with
///     `lurk coprocessor --name <NAME> <CIRCOM_FOLDER>`) or be a valid gadget repository following
///     our standard layout.
///  2. The desired release of the gadget to use. This is only relevant when dealing with remote gadget,
///     not for gadget only existing on the file system.
///  3. A defined way to take a list of Lurk input pointers
///     and turn them into a Circom input. We do not enforce
///     the shapes of either the Lurk end or the Circom end,
///     so users should take care to define what shape they expect.
///  4. A defined way *Lurk* should evaluate what this gadget does.
///     This is then the implementation used in the `Coprocessor` trait.
pub trait CircomGadget<F: LurkField>: Send + Sync + Clone {
    fn reference(&self) -> &str;

    fn version(&self) -> Option<&str> {
        None
    }

    fn into_circom_input(self, input: &[AllocatedPtr<F>]) -> Vec<(String, Vec<F>)>;

    fn evaluate_simple(&self, s: &Store<F>, args: &[Ptr]) -> Ptr;
}
