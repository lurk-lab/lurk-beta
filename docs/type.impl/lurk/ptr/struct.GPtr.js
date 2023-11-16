(function() {var type_impls = {
"lurk":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#78-110\">source</a><a href=\"#impl-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_opaque\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#80-82\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.is_opaque\" class=\"fn\">is_opaque</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>check if a Ptr is an opaque pointer</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.index\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#85-91\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.index\" class=\"fn\">index</a>(tag: T, idx: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Construct a Ptr from an index</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.opaque\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#94-100\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.opaque\" class=\"fn\">opaque</a>(tag: T, idx: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Construct a Ptr from an opaque index</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.null\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#103-109\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.null\" class=\"fn\">null</a>(tag: T) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Construct a null Ptr</p>\n</div></details></div></details>",0,"lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-GPtr%3CF,+ExprTag%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#122-172\">source</a><a href=\"#impl-GPtr%3CF,+ExprTag%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>&gt; <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, <a class=\"enum\" href=\"lurk/tag/enum.ExprTag.html\" title=\"enum lurk::tag::ExprTag\">ExprTag</a>&gt;</h3></section></summary><div class=\"impl-items\"><section id=\"method.cast\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#124-130\">source</a><h4 class=\"code-header\">pub fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.cast\" class=\"fn\">cast</a>(self, tag: <a class=\"enum\" href=\"lurk/tag/enum.ExprTag.html\" title=\"enum lurk::tag::ExprTag\">ExprTag</a>) -&gt; Self</h4></section><section id=\"method.as_cons\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#133-139\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.as_cons\" class=\"fn\">as_cons</a>(self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Self&gt;</h4></section><section id=\"method.as_list\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#142-148\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.as_list\" class=\"fn\">as_list</a>(self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Self&gt;</h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_nil\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#152-155\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.is_nil\" class=\"fn\">is_nil</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>check if a Ptr is <code>Nil</code> pointer</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_cons\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#158-160\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.is_cons\" class=\"fn\">is_cons</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>check if a Ptr is a <code>Cons</code> pointer</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_atom\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#164-166\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.is_atom\" class=\"fn\">is_atom</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>check if a Ptr is atomic pointer</p>\n</div></details><section id=\"method.is_list\" class=\"method\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#169-171\">source</a><h4 class=\"code-header\">pub const fn <a href=\"lurk/ptr/struct.GPtr.html#tymethod.is_list\" class=\"fn\">is_list</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></div></details>",0,"lurk::ptr::Ptr"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#impl-Debug-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/nightly/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/nightly/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#impl-PartialEq-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: &amp;<a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>self</code> and <code>other</code> values to be equal, and is used\nby <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/cmp.rs.html#239\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>!=</code>. The default implementation is almost always\nsufficient, and should not be overridden without very good reason.</div></details></div></details>","PartialEq","lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Hash-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#68-73\">source</a><a href=\"#impl-Hash-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#69-72\">source</a><a href=\"#method.hash\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html#tymethod.hash\" class=\"fn\">hash</a>&lt;H: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>&gt;(&amp;self, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut H</a>)</h4></section></summary><div class='docblock'>Feeds this value into the given <a href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html#tymethod.hash\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash_slice\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.3.0\">1.3.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/hash/mod.rs.html#238-240\">source</a></span><a href=\"#method.hash_slice\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html#method.hash_slice\" class=\"fn\">hash_slice</a>&lt;H&gt;(data: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.slice.html\">[Self]</a>, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;mut H</a>)<span class=\"where fmt-newline\">where\n    H: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</span></h4></section></summary><div class='docblock'>Feeds a slice of this type into the given <a href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/nightly/core/hash/trait.Hash.html#method.hash_slice\">Read more</a></div></details></div></details>","Hash","lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<section id=\"impl-Eq-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#impl-Eq-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section>","Eq","lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<section id=\"impl-StructuralPartialEq-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#impl-StructuralPartialEq-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.StructuralPartialEq.html\" title=\"trait core::marker::StructuralPartialEq\">StructuralPartialEq</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section>","StructuralPartialEq","lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#impl-Clone-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/nightly/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<section id=\"impl-Copy-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#impl-Copy-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a> + <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a> + <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section>","Copy","lurk::ptr::Ptr","lurk::ptr::ContPtr"],["<section id=\"impl-StructuralEq-for-GPtr%3CF,+T%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/lurk/ptr.rs.html#55\">source</a><a href=\"#impl-StructuralEq-for-GPtr%3CF,+T%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;F: <a class=\"trait\" href=\"lurk/field/trait.LurkField.html\" title=\"trait lurk::field::LurkField\">LurkField</a>, T: <a class=\"trait\" href=\"lurk/tag/trait.Tag.html\" title=\"trait lurk::tag::Tag\">Tag</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.StructuralEq.html\" title=\"trait core::marker::StructuralEq\">StructuralEq</a> for <a class=\"struct\" href=\"lurk/ptr/struct.GPtr.html\" title=\"struct lurk::ptr::GPtr\">GPtr</a>&lt;F, T&gt;</h3></section>","StructuralEq","lurk::ptr::Ptr","lurk::ptr::ContPtr"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()