(function() {var type_impls = {
"lurk":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-EvaluationEngine%3CG%3E\" class=\"impl\"><a href=\"#impl-Clone-for-EvaluationEngine%3CG%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;G&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for EvaluationEngine&lt;G&gt;<span class=\"where fmt-newline\">where\n    G: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + Group,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; EvaluationEngine&lt;G&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","lurk::proof::nova::EE1","lurk::proof::nova::EE2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-EvaluationEngineTrait%3CG%3E-for-EvaluationEngine%3CG%3E\" class=\"impl\"><a href=\"#impl-EvaluationEngineTrait%3CG%3E-for-EvaluationEngine%3CG%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;G&gt; EvaluationEngineTrait&lt;G&gt; for EvaluationEngine&lt;G&gt;<span class=\"where fmt-newline\">where\n    G: Group,\n    &lt;&lt;G as Group&gt;::CE as CommitmentEngineTrait&lt;G&gt;&gt;::CommitmentKey: CommitmentKeyExtTrait&lt;G&gt;,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.verify\" class=\"method trait-impl\"><a href=\"#method.verify\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">verify</a>(\n    vk: &amp;&lt;EvaluationEngine&lt;G&gt; as EvaluationEngineTrait&lt;G&gt;&gt;::VerifierKey,\n    transcript: &amp;mut &lt;G as Group&gt;::TE,\n    comm: &amp;&lt;&lt;G as Group&gt;::CE as CommitmentEngineTrait&lt;G&gt;&gt;::Commitment,\n    point: &amp;[&lt;G as Group&gt;::Scalar],\n    eval: &amp;&lt;G as Group&gt;::Scalar,\n    arg: &amp;&lt;EvaluationEngine&lt;G&gt; as EvaluationEngineTrait&lt;G&gt;&gt;::EvaluationArgument\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, NovaError&gt;</h4></section></summary><div class=\"docblock\"><p>A method to verify purported evaluations of a batch of polynomials</p>\n</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.ProverKey\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.ProverKey\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">ProverKey</a> = ProverKey&lt;G&gt;</h4></section></summary><div class='docblock'>A type that holds the prover key</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.VerifierKey\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.VerifierKey\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">VerifierKey</a> = VerifierKey&lt;G&gt;</h4></section></summary><div class='docblock'>A type that holds the verifier key</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.EvaluationArgument\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.EvaluationArgument\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">EvaluationArgument</a> = InnerProductArgument&lt;G&gt;</h4></section></summary><div class='docblock'>A type that holds the evaluation argument</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.setup\" class=\"method trait-impl\"><a href=\"#method.setup\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">setup</a>(\n    ck: &amp;&lt;&lt;G as Group&gt;::CE as CommitmentEngineTrait&lt;G&gt;&gt;::CommitmentKey\n) -&gt; (&lt;EvaluationEngine&lt;G&gt; as EvaluationEngineTrait&lt;G&gt;&gt;::ProverKey, &lt;EvaluationEngine&lt;G&gt; as EvaluationEngineTrait&lt;G&gt;&gt;::VerifierKey)</h4></section></summary><div class='docblock'>A method to perform any additional setup needed to produce proofs of evaluations</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.prove\" class=\"method trait-impl\"><a href=\"#method.prove\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">prove</a>(\n    ck: &amp;&lt;&lt;G as Group&gt;::CE as CommitmentEngineTrait&lt;G&gt;&gt;::CommitmentKey,\n    pk: &amp;&lt;EvaluationEngine&lt;G&gt; as EvaluationEngineTrait&lt;G&gt;&gt;::ProverKey,\n    transcript: &amp;mut &lt;G as Group&gt;::TE,\n    comm: &amp;&lt;&lt;G as Group&gt;::CE as CommitmentEngineTrait&lt;G&gt;&gt;::Commitment,\n    poly: &amp;[&lt;G as Group&gt;::Scalar],\n    point: &amp;[&lt;G as Group&gt;::Scalar],\n    eval: &amp;&lt;G as Group&gt;::Scalar\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&lt;EvaluationEngine&lt;G&gt; as EvaluationEngineTrait&lt;G&gt;&gt;::EvaluationArgument, NovaError&gt;</h4></section></summary><div class='docblock'>A method to prove the evaluation of a multilinear polynomial</div></details></div></details>","EvaluationEngineTrait<G>","lurk::proof::nova::EE1","lurk::proof::nova::EE2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-EvaluationEngine%3CG%3E\" class=\"impl\"><a href=\"#impl-Debug-for-EvaluationEngine%3CG%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;G&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for EvaluationEngine&lt;G&gt;<span class=\"where fmt-newline\">where\n    G: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + Group,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","lurk::proof::nova::EE1","lurk::proof::nova::EE2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Deserialize%3C'de%3E-for-EvaluationEngine%3CG%3E\" class=\"impl\"><a href=\"#impl-Deserialize%3C'de%3E-for-EvaluationEngine%3CG%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'de, G&gt; <a class=\"trait\" href=\"https://docs.rs/serde/1.0.191/serde/de/trait.Deserialize.html\" title=\"trait serde::de::Deserialize\">Deserialize</a>&lt;'de&gt; for EvaluationEngine&lt;G&gt;<span class=\"where fmt-newline\">where\n    G: Group,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.deserialize\" class=\"method trait-impl\"><a href=\"#method.deserialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.191/serde/de/trait.Deserialize.html#tymethod.deserialize\" class=\"fn\">deserialize</a>&lt;__D&gt;(\n    __deserializer: __D\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;EvaluationEngine&lt;G&gt;, &lt;__D as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.191/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.191/serde/de/trait.Deserializer.html#associatedtype.Error\" title=\"type serde::de::Deserializer::Error\">Error</a>&gt;<span class=\"where fmt-newline\">where\n    __D: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.191/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;,</span></h4></section></summary><div class='docblock'>Deserialize this value from the given Serde deserializer. <a href=\"https://docs.rs/serde/1.0.191/serde/de/trait.Deserialize.html#tymethod.deserialize\">Read more</a></div></details></div></details>","Deserialize<'de>","lurk::proof::nova::EE1","lurk::proof::nova::EE2"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Serialize-for-EvaluationEngine%3CG%3E\" class=\"impl\"><a href=\"#impl-Serialize-for-EvaluationEngine%3CG%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;G&gt; <a class=\"trait\" href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serialize.html\" title=\"trait serde::ser::Serialize\">Serialize</a> for EvaluationEngine&lt;G&gt;<span class=\"where fmt-newline\">where\n    G: Group,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.serialize\" class=\"method trait-impl\"><a href=\"#method.serialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serialize.html#tymethod.serialize\" class=\"fn\">serialize</a>&lt;__S&gt;(\n    &amp;self,\n    __serializer: __S\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serializer.html#associatedtype.Ok\" title=\"type serde::ser::Serializer::Ok\">Ok</a>, &lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serializer.html#associatedtype.Error\" title=\"type serde::ser::Serializer::Error\">Error</a>&gt;<span class=\"where fmt-newline\">where\n    __S: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>,</span></h4></section></summary><div class='docblock'>Serialize this value into the given Serde serializer. <a href=\"https://docs.rs/serde/1.0.191/serde/ser/trait.Serialize.html#tymethod.serialize\">Read more</a></div></details></div></details>","Serialize","lurk::proof::nova::EE1","lurk::proof::nova::EE2"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()