(function() {var type_impls = {
"lurk":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Trie%3C'a,+F,+ARITY,+HEIGHT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#428-883\">source</a><a href=\"#impl-Trie%3C'a,+F,+ARITY,+HEIGHT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'a, F: <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, const ARITY: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>, const HEIGHT: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>&gt; <a class=\"struct\" href=\"lurk/coprocessor/trie/struct.Trie.html\" title=\"struct lurk::coprocessor::trie::Trie\">Trie</a>&lt;'a, F, ARITY, HEIGHT&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"method.root\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#439-441\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.root\" class=\"fn\">root</a>(&amp;self) -&gt; F</h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.leaves\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#444-446\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.leaves\" class=\"fn\">leaves</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a></h4></section></summary><div class=\"docblock\"><p>How many leaves does this <code>Trie</code> have?</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.row_size\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#449-452\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.row_size\" class=\"fn\">row_size</a>(&amp;self, row: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a></h4></section></summary><div class=\"docblock\"><p>How many nodes does the <code>row</code>th row have?</p>\n</div></details><section id=\"method.empty_root\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#496-498\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.empty_root\" class=\"fn\">empty_root</a>(&amp;mut self) -&gt; F</h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#502-507\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.new\" class=\"fn\">new</a>(\n    poseidon_cache: &amp;'a PoseidonCache&lt;F&gt;,\n    inverse_poseidon_cache: &amp;'a InversePoseidonCache&lt;F&gt;\n) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Creates a new <code>Trie</code>, saving preimage data in <code>store</code>.\nHEIGHT must be exactly that required to minimally store all elements of <code>F</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.new_with_capacity\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#511-517\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.new_with_capacity\" class=\"fn\">new_with_capacity</a>(\n    poseidon_cache: &amp;'a PoseidonCache&lt;F&gt;,\n    inverse_poseidon_cache: &amp;'a InversePoseidonCache&lt;F&gt;,\n    size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>\n) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Creates a new <code>Trie</code>, saving preimage data in <code>store</code>.\nHeight must be at least that required to store <code>size</code> elements.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.lookup\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#636-639\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.lookup\" class=\"fn\">lookup</a>(&amp;self, key: F) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;F&gt;, <a class=\"enum\" href=\"lurk/coprocessor/trie/enum.Error.html\" title=\"enum lurk::coprocessor::trie::Error\">Error</a>&lt;F&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Returns a value corresponding to the commitment associated with <code>key</code>, if any.\nNote that this depends on the impossibility of discovering a value for which the commitment is zero. We could\nalternately return the empty element (<code>F::zero()</code>) for missing values, but instead return an <code>Option</code> to more\nclearly signal intent – since the encoding of ‘missing’ values as <code>Fr::zero()</code> is significant.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.prove_lookup\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#719-722\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.prove_lookup\" class=\"fn\">prove_lookup</a>(\n    &amp;self,\n    key: F\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"lurk/coprocessor/trie/struct.LookupProof.html\" title=\"struct lurk::coprocessor::trie::LookupProof\">LookupProof</a>&lt;F, ARITY, HEIGHT&gt;, <a class=\"enum\" href=\"lurk/coprocessor/trie/enum.Error.html\" title=\"enum lurk::coprocessor::trie::Error\">Error</a>&lt;F&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Returns a slice of preimages, corresponding to the path.\nFinal preimage contains payloads.</p>\n</div></details><section id=\"method.insert\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#746-750\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.insert\" class=\"fn\">insert</a>(&amp;mut self, key: F, value: F) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.bool.html\">bool</a>, <a class=\"enum\" href=\"lurk/coprocessor/trie/enum.Error.html\" title=\"enum lurk::coprocessor::trie::Error\">Error</a>&lt;F&gt;&gt;</h4></section><section id=\"method.prove_insert\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#752-759\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.prove_insert\" class=\"fn\">prove_insert</a>(\n    &amp;mut self,\n    key: F,\n    value: F\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;(<a class=\"struct\" href=\"lurk/coprocessor/trie/struct.InsertProof.html\" title=\"struct lurk::coprocessor::trie::InsertProof\">InsertProof</a>&lt;F, ARITY, HEIGHT&gt;, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.bool.html\">bool</a>), <a class=\"enum\" href=\"lurk/coprocessor/trie/enum.Error.html\" title=\"enum lurk::coprocessor::trie::Error\">Error</a>&lt;F&gt;&gt;</h4></section><section id=\"method.synthesize_insert\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#804-820\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/coprocessor/trie/struct.Trie.html#tymethod.synthesize_insert\" class=\"fn\">synthesize_insert</a>&lt;CS: ConstraintSystem&lt;F&gt;&gt;(\n    &amp;self,\n    cs: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.reference.html\">&amp;mut CS</a>,\n    hash_constants: &amp;HashConstants&lt;F&gt;,\n    allocated_root: &amp;AllocatedNum&lt;F&gt;,\n    key: &amp;AllocatedNum&lt;F&gt;,\n    value: AllocatedNum&lt;F&gt;\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;AllocatedNum&lt;F&gt;, SynthesisError&gt;</h4></section></div></details>",0,"lurk::coprocessor::trie::StandardTrie"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Default-for-Trie%3C'a,+F,+ARITY,+HEIGHT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#895-901\">source</a><a href=\"#impl-Default-for-Trie%3C'a,+F,+ARITY,+HEIGHT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'a, F: <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, const ARITY: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>, const HEIGHT: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"lurk/coprocessor/trie/struct.Trie.html\" title=\"struct lurk::coprocessor::trie::Trie\">Trie</a>&lt;'a, F, ARITY, HEIGHT&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.default\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#898-900\">source</a><a href=\"#method.default\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/default/trait.Default.html#tymethod.default\" class=\"fn\">default</a>() -&gt; Self</h4></section></summary><div class='docblock'>Returns the “default value” for a type. <a href=\"https://doc.rust-lang.org/1.76.0/core/default/trait.Default.html#tymethod.default\">Read more</a></div></details></div></details>","Default","lurk::coprocessor::trie::StandardTrie"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-Trie%3C'a,+F,+ARITY,+HEIGHT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#331\">source</a><a href=\"#impl-Debug-for-Trie%3C'a,+F,+ARITY,+HEIGHT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'a, F: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, const ARITY: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>, const HEIGHT: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"lurk/coprocessor/trie/struct.Trie.html\" title=\"struct lurk::coprocessor::trie::Trie\">Trie</a>&lt;'a, F, ARITY, HEIGHT&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lurk/coprocessor/trie/mod.rs.html#331\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.76.0/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.76.0/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","lurk::coprocessor::trie::StandardTrie"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()