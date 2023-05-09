use super::{tag::Tag, MetaPtr, LEM, LEMOP};

pub fn step() -> LEM<'static> {
    let input = ["expr_in", "env_in", "cont_in"];
    let output = ["expr_out", "env_out", "cont_out"];
    let lem_op = LEMOP::mk_match_tag(
        MetaPtr("expr_in"),
        vec![(
            Tag::Num,
            LEMOP::mk_match_tag(
                MetaPtr("cont_in"),
                vec![(
                    Tag::Outermost,
                    LEMOP::Seq(vec![
                        LEMOP::Copy(MetaPtr("expr_out"), MetaPtr("expr_in")),
                        LEMOP::Copy(MetaPtr("env_out"), MetaPtr("env_in")),
                        LEMOP::Set(MetaPtr("cont_out"), Tag::Terminal, None),
                    ]),
                )],
                LEMOP::Err("Invalid continuation tag"),
            ),
        )],
        LEMOP::Err("Invalid expression tag"),
    );
    LEM {
        input,
        output,
        lem_op,
    }
}

#[cfg(test)]
pub mod tests {
    use crate::lem::pointers::Ptr;
    use blstrs::Scalar;

    #[test]
    fn check_step() {
        super::step().check()
    }

    #[test]
    fn eval_42() {
        let expr = Ptr::Num(Scalar::from(42));
        // let (res, _) = super::step().eval_res(expr).unwrap();
        // assert!(res == expr);
    }
}
