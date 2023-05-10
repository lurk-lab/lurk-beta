use crate::field::*;

use super::tag::Tag;

#[derive(Clone, Copy, PartialEq, std::cmp::Eq)]
pub enum PtrVal<F: LurkField> {
    Char(char),
    U64(u64),
    Num(F),
    Null,
    Index2(usize),
    Index3(usize),
    Index4(usize),
}

#[derive(Clone, Copy, PartialEq, std::cmp::Eq)]
pub struct Ptr<F: LurkField> {
    pub tag: Tag,
    pub val: PtrVal<F>,
}

impl<F: LurkField> std::hash::Hash for Ptr<F> {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        match self.val {
            PtrVal::Char(x) => (0, self.tag, x).hash(state),
            PtrVal::U64(x) => (1, self.tag, x).hash(state),
            PtrVal::Num(x) => (2, self.tag, x.to_repr().as_ref()).hash(state),
            PtrVal::Null => self.tag.hash(state),
            PtrVal::Index2(x) => (4, self.tag, x).hash(state),
            PtrVal::Index3(x) => (5, self.tag, x).hash(state),
            PtrVal::Index4(x) => (6, self.tag, x).hash(state),
        }
    }
}

impl<F: LurkField> Ptr<F> {
    pub fn key_ptr_if_sym_ptr(self) -> Ptr<F> {
        match self {
            Ptr { tag: Tag::Sym, val } => Ptr { tag: Tag::Key, val },
            _ => self,
        }
    }
}

pub enum AquaPtr<F: LurkField> {
    Leaf(Tag, F),
    Tree2(Tag, F, Box<(AquaPtr<F>, AquaPtr<F>)>),
    Tree3(Tag, F, Box<(AquaPtr<F>, AquaPtr<F>, AquaPtr<F>)>),
    Tree4(
        Tag,
        F,
        Box<(AquaPtr<F>, AquaPtr<F>, AquaPtr<F>, AquaPtr<F>)>,
    ),
}

impl<F: LurkField> AquaPtr<F> {
    pub fn tag_val_fields(&self) -> (F, F) {
        match self {
            Self::Leaf(tag, f) => (tag.field(), *f),
            Self::Tree2(tag, f, _) => (tag.field(), *f),
            Self::Tree3(tag, f, ..) => (tag.field(), *f),
            Self::Tree4(tag, f, ..) => (tag.field(), *f),
        }
    }
}
