(function() {var type_impls = {
"lurk":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"impl\"><a href=\"#impl-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E1, E2, C1, C2&gt; PublicParams&lt;E1, E2, C1, C2&gt;<span class=\"where fmt-newline\">where\n    E1: Engine&lt;Base = &lt;E2 as Engine&gt;::Scalar&gt;,\n    E2: Engine&lt;Base = &lt;E1 as Engine&gt;::Scalar&gt;,\n    C1: StepCircuit&lt;&lt;E1 as Engine&gt;::Scalar&gt;,\n    C2: StepCircuit&lt;&lt;E2 as Engine&gt;::Scalar&gt;,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.setup\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">setup</a>(\n    c_primary: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;C1</a>,\n    c_secondary: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;C2</a>,\n    ck_hint1: &amp;(dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(&amp;R1CSShape&lt;E1&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a> + 'static),\n    ck_hint2: &amp;(dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(&amp;R1CSShape&lt;E2&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a> + 'static)\n) -&gt; PublicParams&lt;E1, E2, C1, C2&gt;</h4></section></summary><div class=\"docblock\"><p>Set up builder to create <code>PublicParams</code> for a pair of circuits <code>C1</code> and <code>C2</code>.</p>\n<h5 id=\"note\"><a href=\"#note\">Note</a></h5>\n<p>Public parameters set up a number of bases for the homomorphic commitment scheme of Nova.</p>\n<p>Some final compressing SNARKs, like variants of Spartan, use computation commitments that require\nlarger sizes for these parameters. These SNARKs provide a hint for these values by\nimplementing <code>RelaxedR1CSSNARKTrait::ck_floor()</code>, which can be passed to this function.</p>\n<p>If you’re not using such a SNARK, pass <code>nova_snark::traits::snark::default_ck_hint()</code> instead.</p>\n<h5 id=\"arguments\"><a href=\"#arguments\">Arguments</a></h5>\n<ul>\n<li><code>c_primary</code>: The primary circuit of type <code>C1</code>.</li>\n<li><code>c_secondary</code>: The secondary circuit of type <code>C2</code>.</li>\n<li><code>ck_hint1</code>: A <code>CommitmentKeyHint</code> for <code>G1</code>, which is a function that provides a hint\nfor the number of generators required in the commitment scheme for the primary circuit.</li>\n<li><code>ck_hint2</code>: A <code>CommitmentKeyHint</code> for <code>G2</code>, similar to <code>ck_hint1</code>, but for the secondary circuit.</li>\n</ul>\n<h5 id=\"example\"><a href=\"#example\">Example</a></h5>\n<div class=\"example-wrap\"><pre class=\"rust rust-example-rendered\"><code><span class=\"kw\">use </span>nova_snark::PublicParams;\n\n<span class=\"kw\">type </span>E1 = PallasEngine;\n<span class=\"kw\">type </span>E2 = VestaEngine;\n<span class=\"kw\">type </span>EE&lt;E&gt; = EvaluationEngine&lt;E&gt;;\n<span class=\"kw\">type </span>SPrime&lt;E&gt; = RelaxedR1CSSNARK&lt;E, EE&lt;E&gt;&gt;;\n\n<span class=\"kw\">let </span>circuit1 = TrivialCircuit::&lt;&lt;E1 <span class=\"kw\">as </span>Engine&gt;::Scalar&gt;::default();\n<span class=\"kw\">let </span>circuit2 = TrivialCircuit::&lt;&lt;E2 <span class=\"kw\">as </span>Engine&gt;::Scalar&gt;::default();\n<span class=\"comment\">// Only relevant for a SNARK using computational commitments, pass &amp;(|_| 0)\n// or &amp;*nova_snark::traits::snark::default_ck_hint() otherwise.\n</span><span class=\"kw\">let </span>ck_hint1 = <span class=\"kw-2\">&amp;*</span>SPrime::&lt;E1&gt;::ck_floor();\n<span class=\"kw\">let </span>ck_hint2 = <span class=\"kw-2\">&amp;*</span>SPrime::&lt;E2&gt;::ck_floor();\n\n<span class=\"kw\">let </span>pp = PublicParams::setup(<span class=\"kw-2\">&amp;</span>circuit1, <span class=\"kw-2\">&amp;</span>circuit2, ck_hint1, ck_hint2);</code></pre></div>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.digest\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">digest</a>(&amp;self) -&gt; &lt;E1 as Engine&gt;::Scalar</h4></section></summary><div class=\"docblock\"><p>Retrieve the digest of the public parameters.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.num_constraints\" class=\"method\"><h4 class=\"code-header\">pub const fn <a class=\"fn\">num_constraints</a>(&amp;self) -&gt; (<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>)</h4></section></summary><div class=\"docblock\"><p>Returns the number of constraints in the primary and secondary circuits</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.num_variables\" class=\"method\"><h4 class=\"code-header\">pub const fn <a class=\"fn\">num_variables</a>(&amp;self) -&gt; (<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>)</h4></section></summary><div class=\"docblock\"><p>Returns the number of variables in the primary and secondary circuits</p>\n</div></details></div></details>",0,"lurk::proof::nova::NovaPublicParams"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"impl\"><a href=\"#impl-PartialEq-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E1, E2, C1, C2&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for PublicParams&lt;E1, E2, C1, C2&gt;<span class=\"where fmt-newline\">where\n    E1: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + Engine&lt;Base = &lt;E2 as Engine&gt;::Scalar&gt;,\n    E2: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + Engine&lt;Base = &lt;E1 as Engine&gt;::Scalar&gt;,\n    C1: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + StepCircuit&lt;&lt;E1 as Engine&gt;::Scalar&gt;,\n    C2: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + StepCircuit&lt;&lt;E2 as Engine&gt;::Scalar&gt;,\n    &lt;E1 as Engine&gt;::Scalar: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: &amp;PublicParams&lt;E1, E2, C1, C2&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>self</code> and <code>other</code> values to be equal, and is used\nby <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#239\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>!=</code>. The default implementation is almost always\nsufficient, and should not be overridden without very good reason.</div></details></div></details>","PartialEq","lurk::proof::nova::NovaPublicParams"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Deserialize%3C'de%3E-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"impl\"><a href=\"#impl-Deserialize%3C'de%3E-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'de, E1, E2, C1, C2&gt; <a class=\"trait\" href=\"https://docs.rs/serde/1.0.193/serde/de/trait.Deserialize.html\" title=\"trait serde::de::Deserialize\">Deserialize</a>&lt;'de&gt; for PublicParams&lt;E1, E2, C1, C2&gt;<span class=\"where fmt-newline\">where\n    E1: Engine&lt;Base = &lt;E2 as Engine&gt;::Scalar&gt;,\n    E2: Engine&lt;Base = &lt;E1 as Engine&gt;::Scalar&gt;,\n    C1: StepCircuit&lt;&lt;E1 as Engine&gt;::Scalar&gt;,\n    C2: StepCircuit&lt;&lt;E2 as Engine&gt;::Scalar&gt;,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.deserialize\" class=\"method trait-impl\"><a href=\"#method.deserialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.193/serde/de/trait.Deserialize.html#tymethod.deserialize\" class=\"fn\">deserialize</a>&lt;__D&gt;(\n    __deserializer: __D\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;PublicParams&lt;E1, E2, C1, C2&gt;, &lt;__D as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.193/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.193/serde/de/trait.Deserializer.html#associatedtype.Error\" title=\"type serde::de::Deserializer::Error\">Error</a>&gt;<span class=\"where fmt-newline\">where\n    __D: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.193/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;,</span></h4></section></summary><div class='docblock'>Deserialize this value from the given Serde deserializer. <a href=\"https://docs.rs/serde/1.0.193/serde/de/trait.Deserialize.html#tymethod.deserialize\">Read more</a></div></details></div></details>","Deserialize<'de>","lurk::proof::nova::NovaPublicParams"],["<section id=\"impl-StructuralPartialEq-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"impl\"><a href=\"#impl-StructuralPartialEq-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E1, E2, C1, C2&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.StructuralPartialEq.html\" title=\"trait core::marker::StructuralPartialEq\">StructuralPartialEq</a> for PublicParams&lt;E1, E2, C1, C2&gt;<span class=\"where fmt-newline\">where\n    E1: Engine&lt;Base = &lt;E2 as Engine&gt;::Scalar&gt;,\n    E2: Engine&lt;Base = &lt;E1 as Engine&gt;::Scalar&gt;,\n    C1: StepCircuit&lt;&lt;E1 as Engine&gt;::Scalar&gt;,\n    C2: StepCircuit&lt;&lt;E2 as Engine&gt;::Scalar&gt;,</span></h3></section>","StructuralPartialEq","lurk::proof::nova::NovaPublicParams"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"impl\"><a href=\"#impl-Clone-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E1, E2, C1, C2&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for PublicParams&lt;E1, E2, C1, C2&gt;<span class=\"where fmt-newline\">where\n    E1: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + Engine&lt;Base = &lt;E2 as Engine&gt;::Scalar&gt;,\n    E2: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + Engine&lt;Base = &lt;E1 as Engine&gt;::Scalar&gt;,\n    C1: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + StepCircuit&lt;&lt;E1 as Engine&gt;::Scalar&gt;,\n    C2: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + StepCircuit&lt;&lt;E2 as Engine&gt;::Scalar&gt;,\n    &lt;E1 as Engine&gt;::Scalar: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; PublicParams&lt;E1, E2, C1, C2&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","lurk::proof::nova::NovaPublicParams"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Serialize-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"impl\"><a href=\"#impl-Serialize-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E1, E2, C1, C2&gt; <a class=\"trait\" href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serialize.html\" title=\"trait serde::ser::Serialize\">Serialize</a> for PublicParams&lt;E1, E2, C1, C2&gt;<span class=\"where fmt-newline\">where\n    E1: Engine&lt;Base = &lt;E2 as Engine&gt;::Scalar&gt;,\n    E2: Engine&lt;Base = &lt;E1 as Engine&gt;::Scalar&gt;,\n    C1: StepCircuit&lt;&lt;E1 as Engine&gt;::Scalar&gt;,\n    C2: StepCircuit&lt;&lt;E2 as Engine&gt;::Scalar&gt;,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.serialize\" class=\"method trait-impl\"><a href=\"#method.serialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serialize.html#tymethod.serialize\" class=\"fn\">serialize</a>&lt;__S&gt;(\n    &amp;self,\n    __serializer: __S\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serializer.html#associatedtype.Ok\" title=\"type serde::ser::Serializer::Ok\">Ok</a>, &lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serializer.html#associatedtype.Error\" title=\"type serde::ser::Serializer::Error\">Error</a>&gt;<span class=\"where fmt-newline\">where\n    __S: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>,</span></h4></section></summary><div class='docblock'>Serialize this value into the given Serde serializer. <a href=\"https://docs.rs/serde/1.0.193/serde/ser/trait.Serialize.html#tymethod.serialize\">Read more</a></div></details></div></details>","Serialize","lurk::proof::nova::NovaPublicParams"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Abomonation-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"impl\"><a href=\"#impl-Abomonation-for-PublicParams%3CE1,+E2,+C1,+C2%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E1, E2, C1, C2&gt; Abomonation for PublicParams&lt;E1, E2, C1, C2&gt;<span class=\"where fmt-newline\">where\n    E1: Engine&lt;Base = &lt;E2 as Engine&gt;::Scalar&gt;,\n    E2: Engine&lt;Base = &lt;E1 as Engine&gt;::Scalar&gt;,\n    C1: StepCircuit&lt;&lt;E1 as Engine&gt;::Scalar&gt;,\n    C2: StepCircuit&lt;&lt;E2 as Engine&gt;::Scalar&gt;,\n    &lt;&lt;E1 as Engine&gt;::Scalar as PrimeField&gt;::Repr: Abomonation,\n    &lt;&lt;E2 as Engine&gt;::Scalar as PrimeField&gt;::Repr: Abomonation,</span></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.entomb\" class=\"method trait-impl\"><a href=\"#method.entomb\" class=\"anchor\">§</a><h4 class=\"code-header\">unsafe fn <a class=\"fn\">entomb</a>&lt;W&gt;(&amp;self, bytes: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut W</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/std/io/error/struct.Error.html\" title=\"struct std::io::error::Error\">Error</a>&gt;<span class=\"where fmt-newline\">where\n    W: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/std/io/trait.Write.html\" title=\"trait std::io::Write\">Write</a>,</span></h4></section></summary><div class='docblock'>Write any additional information about <code>&amp;self</code> beyond its binary representation. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.exhume\" class=\"method trait-impl\"><a href=\"#method.exhume\" class=\"anchor\">§</a><h4 class=\"code-header\">unsafe fn <a class=\"fn\">exhume</a>&lt;'a, 'b&gt;(\n    &amp;'a mut self,\n    bytes: &amp;'b mut [<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>]\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&amp;'b mut [<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>]&gt;</h4></section></summary><div class='docblock'>Recover any information for <code>&amp;mut self</code> not evident from its binary representation. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.extent\" class=\"method trait-impl\"><a href=\"#method.extent\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">extent</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a></h4></section></summary><div class='docblock'>Reports the number of further bytes required to entomb <code>self</code>.</div></details></div></details>","Abomonation","lurk::proof::nova::NovaPublicParams"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()