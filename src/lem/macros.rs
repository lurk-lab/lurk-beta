#[macro_export]
macro_rules! var {
    ($variable:ident) => {
        $crate::lem::Var(stringify!($variable).into())
    };
}

#[macro_export]
macro_rules! vars {
    ($($variable:ident),*) => {
        [
            $($crate::var!($variable)),*
        ]
    };
}

#[macro_export]
macro_rules! op {
    ( let $tgt:ident : $tag:ident ) => {
        $crate::lem::Op::Null($crate::var!($tgt), $crate::lem::Tag::$tag)
    };
    ( let $tgt:ident = Scalar($num:literal) ) => {
        $crate::lem::Op::Lit(
            $crate::var!($tgt),
            $crate::lem::Lit::Scalar($num)
        )
    };
    ( let $tgt:ident = String($str:literal) ) => {
        $crate::lem::Op::Lit(
            $crate::var!($tgt),
            $crate::lem::Lit::String($str.into())
        )
    };
    ( let $tgt:ident = Symbol($str:literal) ) => {
        $crate::lem::Op::Lit(
            $crate::var!($tgt),
            $crate::lem::Lit::Symbol($str.into())
        )
    };
    ( let $tgt:ident : $tag:ident = hash2($src1:ident, $src2:ident) ) => {
        $crate::lem::Op::Hash2(
            $crate::var!($tgt),
            $crate::lem::Tag::$tag,
            $crate::vars!($src1, $src2),
        )
    };
    ( let $tgt:ident : $tag:ident = hash3($src1:ident, $src2:ident, $src3:ident) ) => {
        $crate::lem::Op::Hash3(
            $crate::var!($tgt),
            $crate::lem::Tag::$tag,
            $crate::vars!($src1, $src2, $src3),
        )
    };
    ( let $tgt:ident : $tag:ident = hash4($src1:ident, $src2:ident, $src3:ident, $src4:ident) ) => {
        $crate::lem::Op::Hash4(
            $crate::var!($tgt),
            $crate::lem::Tag::$tag,
            $crate::vars!($src1, $src2, $src3, $src4),
        )
    };
    ( let ($tgt1:ident, $tgt2:ident) = unhash2($src:ident) ) => {
        $crate::lem::Op::Unhash2(
            $crate::vars!($tgt1, $tgt2),
            $crate::var!($src),
        )
    };
    ( let ($tgt1:ident, $tgt2:ident, $tgt3:ident) = unhash3($src:ident) ) => {
        $crate::lem::Op::Unhash3($crate::vars!($tgt1, $tgt2, $tgt3), $crate::var!($src))
    };
    ( let ($tgt1:ident, $tgt2:ident, $tgt3:ident, $tgt4:ident) = unhash4($src:ident) ) => {
        $crate::lem::Op::Unhash4(
            $crate::vars!($tgt1, $tgt2, $tgt3, $tgt4),
            $crate::var!($src),
        )
    };
    ( let $tgt:ident = hide($sec:ident, $src:ident) ) => {
        $crate::lem::Op::Hide($crate::var!($tgt), $crate::var!($sec), $crate::var!($src))
    };
    ( let ($sec:ident, $src:ident) = open($hash:ident) ) => {
        $crate::lem::Op::Open($crate::var!($sec), $crate::var!($src), $crate::var!($hash))
    };
    ( let ($($tgt:ident),*) = $func:ident($($arg:ident),*) ) => {
        {
            let out = vec!($($crate::var!($tgt)),*);
            let inp = vec!($($crate::var!($arg)),*);
            let func = Box::new($func.clone());
            $crate::lem::Op::Call(out, func, inp)
        }
    }
}

#[macro_export]
macro_rules! ctrl {
    ( match $sii:ident.tag { $( $tag:ident $(| $other_tags:ident)* => $case_ops:tt )* } $(; $($def:tt)*)? ) => {
        {
            let mut cases = indexmap::IndexMap::new();
            $(
                if cases.insert(
                    $crate::lem::Tag::$tag,
                    $crate::block!( $case_ops ),
                ).is_some() {
                    panic!("Repeated tag on `match`");
                };
                $(
                    if cases.insert(
                        $crate::lem::Tag::$other_tags,
                        $crate::block!( $case_ops ),
                    ).is_some() {
                        panic!("Repeated tag on `match`");
                    };
                )*
            )*
            let default = None $( .or (Some(Box::new($crate::block!( @seq {} , $($def)* )))) )?;
            $crate::lem::Ctrl::MatchTag($crate::var!($sii), cases, default)
        }
    };
    ( match $sii:ident.symbol { $( $symbol:literal $(| $other_symbols:literal)* => $case_ops:tt )* } $(; $($def:tt)*)? ) => {
        {
            let mut cases = indexmap::IndexMap::new();
            $(
                if cases.insert(
                    $crate::lem::Symbol::lurk_sym(&$symbol),
                    $crate::block!( $case_ops ),
                ).is_some() {
                    panic!("Repeated symbol on `match`");
                };
                $(
                    if cases.insert(
                        $crate::lem::Symbol::lurk_sym(&$other_symbols),
                        $crate::block!( $case_ops ),
                    ).is_some() {
                        panic!("Repeated symbol on `match`");
                    };
                )*
            )*
            let default = None $( .or (Some(Box::new($crate::block!( @seq {}, $($def)* )))) )?;
            $crate::lem::Ctrl::MatchVal($crate::var!($sii), cases, default)
        }
    };
    ( if $x:ident == $y:ident { $($true_block:tt)+ } $($false_block:tt)+ ) => {
        {
            let x = $crate::var!($x);
            let y = $crate::var!($y);
            let true_block = Box::new($crate::block!( @seq {}, $($true_block)+ ));
            let false_block = Box::new($crate::block!( @seq {}, $($false_block)+ ));
            $crate::lem::Ctrl::IfEq(x, y, true_block, false_block)
        }
    };
    ( if $x:ident != $y:ident { $($true_block:tt)+ } $($false_block:tt)+ ) => {
        {
            let x = $crate::var!($x);
            let y = $crate::var!($y);
            let true_block = Box::new($crate::block!( @seq {}, $($true_block)+ ));
            let false_block = Box::new($crate::block!( @seq {}, $($false_block)+ ));
            $crate::lem::Ctrl::IfNotEq(x, y, true_block, false_block)
        }
    };
    ( return ($($src:ident),*) ) => {
        $crate::lem::Ctrl::Return(
            vec![$($crate::var!($src)),*]
        )
    };
}

#[macro_export]
macro_rules! block {
    // seq entry point, with a separate bracketing to differentiate
    ({ $($body:tt)+ }) => {
        {
            $crate::block! ( @seq {}, $($body)* )
        }
    };
    // handle the recursion: as we see a statement, we push it to the limbs position in the pattern
    (@seq {$($limbs:expr)*}, let $tgt:ident : $tag:ident ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt: $tag)
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let $tgt:ident = Scalar($sym:literal) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt = Scalar($sym))
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let $tgt:ident = String($sym:literal) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt = String($sym))
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let $tgt:ident = Symbol($sym:literal) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt = Symbol($sym))
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let $tgt:ident : $tag:ident = hash2($src1:ident, $src2:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt: $tag = hash2($src1, $src2) )
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let $tgt:ident : $tag:ident = hash3($src1:ident, $src2:ident, $src3:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt: $tag = hash3($src1, $src2, $src3) )
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let $tgt:ident : $tag:ident = hash4($src1:ident, $src2:ident, $src3:ident, $src4:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt: $tag = hash4($src1, $src2, $src3, $src4))
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let ($tgt1:ident, $tgt2:ident) = unhash2($src:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let ($tgt1, $tgt2) = unhash2($src) )
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let ($tgt1:ident, $tgt2:ident, $tgt3:ident) = unhash3($src:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let ($tgt1, $tgt2, $tgt3) = unhash3($src) )
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let ($tgt1:ident, $tgt2:ident, $tgt3:ident, $tgt4:ident) = unhash4($src:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let ($tgt1, $tgt2, $tgt3, $tgt4) = unhash4($src) )
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let $tgt:ident = hide($sec:ident, $src:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let $tgt = hide($sec, $src) )
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let ($sec:ident, $src:ident) = open($hash:ident) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let ($sec, $src) = open($hash) )
            },
            $($tail)*
        )
    };
    (@seq {$($limbs:expr)*}, let ($($tgt:ident),*) = $func:ident($($arg:ident),*) ; $($tail:tt)*) => {
        $crate::block! (
            @seq
            {
                $($limbs)*
                $crate::op!(let ($($tgt),*) = $func($($arg),*))
            },
            $($tail)*
        )
    };

    (@seq {$($limbs:expr)*}, match $sii:ident.tag { $( $tag:ident $(| $other_tags:ident)* => $case_ops:tt )* } $(; $($def:tt)*)?) => {
        $crate::block! (
            @end
            {
                $($limbs)*
            },
            $crate::ctrl!( match $sii.tag { $( $tag $(| $other_tags)* => $case_ops )* } $(; $($def)*)? )
        )
    };
    (@seq {$($limbs:expr)*}, match $sii:ident.symbol { $( $symbol:literal $(| $other_symbols:literal)* => $case_ops:tt )* } $(; $($def:tt)*)?) => {
        $crate::block! (
            @end
            {
                $($limbs)*
            },
            $crate::ctrl!( match $sii.symbol { $( $symbol $(| $other_symbols)* => $case_ops )* } $(; $($def)*)? )
        )
    };
    (@seq {$($limbs:expr)*}, if $x:ident == $y:ident { $($true_block:tt)+ } $($false_block:tt)+ ) => {
        $crate::block! (
            @end
            {
                $($limbs)*
            },
            $crate::ctrl!( if $x == $y { $($true_block)+ } $($false_block)+ )
        )
    };
    (@seq {$($limbs:expr)*}, if $x:ident != $y:ident { $($true_block:tt)+ } $($false_block:tt)+ ) => {
        $crate::block! (
            @end
            {
                $($limbs)*
            },
            $crate::ctrl!( if $x != $y { $($true_block)+ } $($false_block)+ )
        )
    };
    (@seq {$($limbs:expr)*}, return ($($src:ident),*) $(;)?) => {
        $crate::block! (
            @end
            {
                $($limbs)*
            },
            $crate::lem::Ctrl::Return(vec![$($crate::var!($src)),*])
        )
    };
    (@seq {$($limbs:expr)*} ) => {
        {
            compile_error!("You must provide Func with a return at each path!");
        }
    };
    (@end {$($limbs:expr)*}, $cont:expr) => {
        {
            let ops = vec!($($limbs),*);
            let ctrl = $cont;
            $crate::lem::Block{ ops, ctrl }
        }
    }
}

#[macro_export]
macro_rules! func {
    (($( $in:ident ),*): $size:expr => $lem:tt) => {
        $crate::lem::Func::new(
            vec![$($crate::var!($in)),*],
            $size,
            $crate::block!($lem),
        ).unwrap()
    };
}

#[cfg(test)]
mod tests {
    use crate::lem::{symbol::Symbol, tag::Tag, Block, Ctrl, Op, Var};

    #[inline]
    fn mptr(name: &str) -> Var {
        Var(name.into())
    }

    #[inline]
    fn match_tag(i: Var, cases: Vec<(Tag, Block)>) -> Ctrl {
        Ctrl::MatchTag(i, indexmap::IndexMap::from_iter(cases), None)
    }

    #[inline]
    fn match_symbol(i: Var, cases: Vec<(Symbol, Block)>, def: Block) -> Ctrl {
        Ctrl::MatchVal(i, indexmap::IndexMap::from_iter(cases), Some(Box::new(def)))
    }

    #[test]
    fn test_macros() {
        let lemops = [
            Op::Null(mptr("foo"), Tag::Num),
            Op::Hash2(mptr("foo"), Tag::Char, [mptr("bar"), mptr("baz")]),
            Op::Hash3(
                mptr("foo"),
                Tag::Char,
                [mptr("bar"), mptr("baz"), mptr("bazz")],
            ),
            Op::Hash4(
                mptr("foo"),
                Tag::Char,
                [mptr("bar"), mptr("baz"), mptr("bazz"), mptr("baxx")],
            ),
            Op::Unhash2([mptr("foo"), mptr("goo")], mptr("aaa")),
            Op::Unhash3([mptr("foo"), mptr("goo"), mptr("moo")], mptr("aaa")),
            Op::Unhash4(
                [mptr("foo"), mptr("goo"), mptr("moo"), mptr("noo")],
                mptr("aaa"),
            ),
            Op::Hide(mptr("bar"), mptr("baz"), mptr("bazz")),
            Op::Open(mptr("bar"), mptr("baz"), mptr("bazz")),
        ];
        let lemops_macro = vec![
            op!(let foo: Num),
            op!(let foo: Char = hash2(bar, baz)),
            op!(let foo: Char = hash3(bar, baz, bazz)),
            op!(let foo: Char = hash4(bar, baz, bazz, baxx)),
            op!(let (foo, goo) = unhash2(aaa)),
            op!(let (foo, goo, moo) = unhash3(aaa)),
            op!(let (foo, goo, moo, noo) = unhash4(aaa)),
            op!(let bar = hide(baz, bazz)),
            op!(let (bar, baz) = open(bazz)),
        ];

        for i in 0..9 {
            assert!(lemops[i] == lemops_macro[i]);
        }

        let ret = Ctrl::Return(vec![mptr("bar"), mptr("baz"), mptr("bazz")]);
        let block = Block {
            ops: lemops_macro,
            ctrl: ret,
        };
        let lem_macro_seq = block!({
            let foo: Num;
            let foo: Char = hash2(bar, baz);
            let foo: Char = hash3(bar, baz, bazz);
            let foo: Char = hash4(bar, baz, bazz, baxx);
            let (foo, goo) = unhash2(aaa);
            let (foo, goo, moo) = unhash3(aaa);
            let (foo, goo, moo, noo) = unhash4(aaa);
            let bar = hide(baz, bazz);
            let (bar, baz) = open(bazz);
            return (bar, baz, bazz);
        });

        assert!(block == lem_macro_seq);

        let foo = ctrl!(match www.tag {
            Num => {
                return (foo, foo, foo); // a single Ctrl will not turn into a Seq
            }
            Str => {
                let foo: Num;
                return (foo, foo, foo);
            }
            Char => {
                let foo: Num;
                let goo: Char;
                return (foo, goo, goo);
            }
        });
        assert!(
            foo == match_tag(
                mptr("www"),
                vec![
                    (
                        Tag::Num,
                        Block {
                            ops: vec![],
                            ctrl: Ctrl::Return(vec![mptr("foo"), mptr("foo"), mptr("foo")]),
                        }
                    ),
                    (
                        Tag::Str,
                        Block {
                            ops: vec![Op::Null(mptr("foo"), Tag::Num)],
                            ctrl: Ctrl::Return(vec![mptr("foo"), mptr("foo"), mptr("foo")]),
                        }
                    ),
                    (
                        Tag::Char,
                        Block {
                            ops: vec![
                                Op::Null(mptr("foo"), Tag::Num),
                                Op::Null(mptr("goo"), Tag::Char)
                            ],
                            ctrl: Ctrl::Return(vec![mptr("foo"), mptr("goo"), mptr("goo")]),
                        }
                    )
                ]
            )
        );

        let moo = ctrl!(
            match www.symbol {
                "nil" => {
                    return (foo, foo, foo); // a single Ctrl will not turn into a Seq
                }
                "cons" => {
                    let foo: Num;
                    let goo: Char;
                    return (foo, goo, goo);
                }
            };
            let xoo: Str;
            return (xoo, xoo, xoo);
        );

        assert!(
            moo == match_symbol(
                mptr("www"),
                vec![
                    (
                        Symbol::lurk_sym("nil"),
                        Block {
                            ops: vec![],
                            ctrl: Ctrl::Return(vec![mptr("foo"), mptr("foo"), mptr("foo")]),
                        }
                    ),
                    (
                        Symbol::lurk_sym("cons"),
                        Block {
                            ops: vec![
                                Op::Null(mptr("foo"), Tag::Num),
                                Op::Null(mptr("goo"), Tag::Char)
                            ],
                            ctrl: Ctrl::Return(vec![mptr("foo"), mptr("goo"), mptr("goo")]),
                        }
                    )
                ],
                Block {
                    ops: vec![Op::Null(mptr("xoo"), Tag::Str)],
                    ctrl: Ctrl::Return(vec![mptr("xoo"), mptr("xoo"), mptr("xoo")]),
                }
            )
        );
    }
}
