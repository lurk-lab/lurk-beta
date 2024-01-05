(function() {var type_impls = {
"lurk":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"impl\"><a href=\"#impl-Clone-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E, EE&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for RelaxedR1CSSNARK&lt;E, EE&gt;<div class=\"where\">where\n    E: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + Engine,\n    EE: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + EvaluationEngineTrait&lt;E&gt;,\n    &lt;E as Engine&gt;::Scalar: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,\n    &lt;EE as EvaluationEngineTrait&lt;E&gt;&gt;::EvaluationArgument: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; RelaxedR1CSSNARK&lt;E, EE&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","lurk::proof::nova::SS1","lurk::proof::nova::SS2","lurk::proof::supernova::SS2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Deserialize%3C'de%3E-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"impl\"><a href=\"#impl-Deserialize%3C'de%3E-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'de, E, EE&gt; <a class=\"trait\" href=\"https://docs.rs/serde/1.0.194/serde/de/trait.Deserialize.html\" title=\"trait serde::de::Deserialize\">Deserialize</a>&lt;'de&gt; for RelaxedR1CSSNARK&lt;E, EE&gt;<div class=\"where\">where\n    E: Engine,\n    EE: EvaluationEngineTrait&lt;E&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.deserialize\" class=\"method trait-impl\"><a href=\"#method.deserialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.194/serde/de/trait.Deserialize.html#tymethod.deserialize\" class=\"fn\">deserialize</a>&lt;__D&gt;(\n    __deserializer: __D\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;RelaxedR1CSSNARK&lt;E, EE&gt;, &lt;__D as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.194/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.194/serde/de/trait.Deserializer.html#associatedtype.Error\" title=\"type serde::de::Deserializer::Error\">Error</a>&gt;<div class=\"where\">where\n    __D: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.194/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;,</div></h4></section></summary><div class='docblock'>Deserialize this value from the given Serde deserializer. <a href=\"https://docs.rs/serde/1.0.194/serde/de/trait.Deserialize.html#tymethod.deserialize\">Read more</a></div></details></div></details>","Deserialize<'de>","lurk::proof::nova::SS1","lurk::proof::nova::SS2","lurk::proof::supernova::SS2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-RelaxedR1CSSNARKTrait%3CE%3E-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"impl\"><a href=\"#impl-RelaxedR1CSSNARKTrait%3CE%3E-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E, EE&gt; RelaxedR1CSSNARKTrait&lt;E&gt; for RelaxedR1CSSNARK&lt;E, EE&gt;<div class=\"where\">where\n    E: Engine,\n    EE: EvaluationEngineTrait&lt;E&gt;,\n    &lt;&lt;E as Engine&gt;::Scalar as PrimeField&gt;::Repr: Abomonation,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.prove\" class=\"method trait-impl\"><a href=\"#method.prove\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">prove</a>(\n    ck: &amp;&lt;&lt;E as Engine&gt;::CE as CommitmentEngineTrait&lt;E&gt;&gt;::CommitmentKey,\n    pk: &amp;&lt;RelaxedR1CSSNARK&lt;E, EE&gt; as RelaxedR1CSSNARKTrait&lt;E&gt;&gt;::ProverKey,\n    S: &amp;R1CSShape&lt;E&gt;,\n    U: &amp;RelaxedR1CSInstance&lt;E&gt;,\n    W: &amp;RelaxedR1CSWitness&lt;E&gt;\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;RelaxedR1CSSNARK&lt;E, EE&gt;, NovaError&gt;</h4></section></summary><div class=\"docblock\"><p>produces a succinct proof of satisfiability of a <code>RelaxedR1CS</code> instance</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.verify\" class=\"method trait-impl\"><a href=\"#method.verify\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">verify</a>(\n    &amp;self,\n    vk: &amp;&lt;RelaxedR1CSSNARK&lt;E, EE&gt; as RelaxedR1CSSNARKTrait&lt;E&gt;&gt;::VerifierKey,\n    U: &amp;RelaxedR1CSInstance&lt;E&gt;\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, NovaError&gt;</h4></section></summary><div class=\"docblock\"><p>verifies a proof of satisfiability of a <code>RelaxedR1CS</code> instance</p>\n</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.ProverKey\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.ProverKey\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">ProverKey</a> = ProverKey&lt;E, EE&gt;</h4></section></summary><div class='docblock'>A type that represents the prover’s key</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.VerifierKey\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.VerifierKey\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">VerifierKey</a> = VerifierKey&lt;E, EE&gt;</h4></section></summary><div class='docblock'>A type that represents the verifier’s key</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.setup\" class=\"method trait-impl\"><a href=\"#method.setup\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">setup</a>(\n    ck: &amp;&lt;&lt;E as Engine&gt;::CE as CommitmentEngineTrait&lt;E&gt;&gt;::CommitmentKey,\n    S: &amp;R1CSShape&lt;E&gt;\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;(&lt;RelaxedR1CSSNARK&lt;E, EE&gt; as RelaxedR1CSSNARKTrait&lt;E&gt;&gt;::ProverKey, &lt;RelaxedR1CSSNARK&lt;E, EE&gt; as RelaxedR1CSSNARKTrait&lt;E&gt;&gt;::VerifierKey), NovaError&gt;</h4></section></summary><div class='docblock'>Produces the keys for the prover and the verifier</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ck_floor\" class=\"method trait-impl\"><a href=\"#method.ck_floor\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">ck_floor</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn for&lt;'a&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(&amp;'a R1CSShape&lt;E&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>&gt;</h4></section></summary><div class='docblock'>This associated function (not a method) provides a hint that offers\na minimum sizing cue for the commitment key used by this SNARK\nimplementation. The commitment key passed in setup should then\nbe at least as large as this hint.</div></details></div></details>","RelaxedR1CSSNARKTrait<E>","lurk::proof::nova::SS1","lurk::proof::nova::SS2","lurk::proof::supernova::SS2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Serialize-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"impl\"><a href=\"#impl-Serialize-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E, EE&gt; <a class=\"trait\" href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serialize.html\" title=\"trait serde::ser::Serialize\">Serialize</a> for RelaxedR1CSSNARK&lt;E, EE&gt;<div class=\"where\">where\n    E: Engine,\n    EE: EvaluationEngineTrait&lt;E&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.serialize\" class=\"method trait-impl\"><a href=\"#method.serialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serialize.html#tymethod.serialize\" class=\"fn\">serialize</a>&lt;__S&gt;(\n    &amp;self,\n    __serializer: __S\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serializer.html#associatedtype.Ok\" title=\"type serde::ser::Serializer::Ok\">Ok</a>, &lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serializer.html#associatedtype.Error\" title=\"type serde::ser::Serializer::Error\">Error</a>&gt;<div class=\"where\">where\n    __S: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>,</div></h4></section></summary><div class='docblock'>Serialize this value into the given Serde serializer. <a href=\"https://docs.rs/serde/1.0.194/serde/ser/trait.Serialize.html#tymethod.serialize\">Read more</a></div></details></div></details>","Serialize","lurk::proof::nova::SS1","lurk::proof::nova::SS2","lurk::proof::supernova::SS2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"impl\"><a href=\"#impl-Debug-for-RelaxedR1CSSNARK%3CE,+EE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E, EE&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for RelaxedR1CSSNARK&lt;E, EE&gt;<div class=\"where\">where\n    E: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + Engine,\n    EE: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + EvaluationEngineTrait&lt;E&gt;,\n    &lt;E as Engine&gt;::Scalar: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    &lt;EE as EvaluationEngineTrait&lt;E&gt;&gt;::EvaluationArgument: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","lurk::proof::nova::SS1","lurk::proof::nova::SS2","lurk::proof::supernova::SS2"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()