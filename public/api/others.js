webpackJsonp([8,14],{1195:function(a,s){a.exports={content:'<div class="picidae-toc">\n<ul>\n<li>\n<a href="#model">Model</a>\n<ul>\n<li>\n<a href="#piped">Piped</a>\n</li>\n<li>\n<a href="#root">Root</a>\n<ul>\n<li>\n<a href="#create">create</a>\n</li>\n<li>\n<a href="#init">init</a>\n</li>\n<li>\n<a href="#update">update</a>\n</li>\n<li>\n<a href="#exit">exit</a>\n</li>\n<li>\n<a href="#tojson">toJSON</a>\n</li>\n<li>\n<a href="#action">action</a>\n</li>\n<li>\n<a href="#clone">clone</a>\n</li>\n<li>\n<a href="#isequal">isEqual</a>\n</li>\n<li>\n<a href="#assign">assign</a>\n</li>\n<li>\n<a href="#assigndeep">assignDeep</a>\n</li>\n<li>\n<a href="#isempty">isEmpty</a>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>\n<a href="#renderer">Renderer</a>\n<ul>\n<li>\n<a href="#h">h</a>\n</li>\n</ul>\n</li>\n<li>\n<a href="#extension">Extension</a>\n<ul>\n<li>\n<a href="#providerfactory">providerFactory</a>\n</li>\n<li>\n<a href="#router">Router</a>\n</li>\n</ul>\n</li>\n</ul>\n</div>\n<hr>\n<h1 id="model"><a href="#model" aria-hidden="true"><span class="icon icon-link"></span></a>Model</h1>\n<!-- Generated by documentation.js. Update this documentation by updating the source code. -->\n<h2 id="piped"><a href="#piped" aria-hidden="true"><span class="icon icon-link"></span></a>Piped</h2>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Piped.js#L19-L27" title="Source code on GitHub">src/Model/Piped.js:19-27</a></p>\n<p><strong>Extends Root</strong></p>\n<p>其对 Root 中的 init/update 进行的无差别的赋值，\n如果你需要对 View 中的 props 一股脑都同步至 Model 中，\n则可以通过继承该类来实现</p>\n<h2 id="root"><a href="#root" aria-hidden="true"><span class="icon icon-link"></span></a>Root</h2>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L20-L178" title="Source code on GitHub">src/Model/Root.js:20-178</a></p>\n<p>建议所以的 Model 都继承自该类，提供了一些方法</p>\n<h3 id="create"><a href="#create" aria-hidden="true"><span class="icon icon-link"></span></a>create</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L34-L36" title="Source code on GitHub">src/Model/Root.js:34-36</a></p>\n<p>建议使用给方法创建实例对象，而不是 <code>new Model()</code> 原因参看 <a href="https://github.com/imcuttle/babel-plugin-class-properties-default-value">https://github.com/imcuttle/babel-plugin-class-properties-default-value</a></p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>init</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></strong>  (optional, default <code>{}</code>)</li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Model</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Root</span> </span>{\n   val = <span class="hljs-number">123</span>\n}\n<span class="hljs-keyword">const</span> model = Model.create({ <span class="hljs-attr">val</span>: <span class="hljs-string">\'345\'</span> })</code></pre>\n<p>Returns <strong><a href="#root">Root</a></strong> </p>\n<h3 id="init"><a href="#init" aria-hidden="true"><span class="icon icon-link"></span></a>init</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L43-L44" title="Source code on GitHub">src/Model/Root.js:43-44</a></p>\n<p>该方法对应与 React 的 componentDidMount 生命周期</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>props</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></strong> View 中的 <code>this.props</code></li>\n</ul>\n<h3 id="update"><a href="#update" aria-hidden="true"><span class="icon icon-link"></span></a>update</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L51-L52" title="Source code on GitHub">src/Model/Root.js:51-52</a></p>\n<p>该方法对应与 React 的 componentWillReceiveProps 生命周期</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>props</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></strong> View 中的 <code>nextProps</code></li>\n</ul>\n<h3 id="exit"><a href="#exit" aria-hidden="true"><span class="icon icon-link"></span></a>exit</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L59-L60" title="Source code on GitHub">src/Model/Root.js:59-60</a></p>\n<p>该方法对应与 React 的 componentWillUnmount 生命周期</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>props</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></strong> View 中的 <code>this.props</code></li>\n</ul>\n<h3 id="tojson"><a href="#tojson" aria-hidden="true"><span class="icon icon-link"></span></a>toJSON</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L66-L68" title="Source code on GitHub">src/Model/Root.js:66-68</a></p>\n<p>将 this 转换为 JSON</p>\n<h3 id="action"><a href="#action" aria-hidden="true"><span class="icon icon-link"></span></a>action</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L85-L85" title="Source code on GitHub">src/Model/Root.js:85-85</a></p>\n<p>设置当前对象中 key 的值</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>key</code> <strong>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a> | <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array">array</a>)</strong> </li>\n<li><code>value</code> <strong>any</strong> </li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript">Root\n .create()\n .setValue(<span class="hljs-string">\'a\'</span>, {})\n .setValue(<span class="hljs-string">\'a.b\'</span>, <span class="hljs-string">\'123\'</span>)\n .setValue([<span class="hljs-string">\'a\'</span>, <span class="hljs-string">\'b\'</span>], <span class="hljs-string">\'456\'</span>)</code></pre>\n<p>Returns <strong><a href="#root">Root</a></strong> </p>\n<h3 id="clone"><a href="#clone" aria-hidden="true"><span class="icon icon-link"></span></a>clone</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L111-L113" title="Source code on GitHub">src/Model/Root.js:111-113</a></p>\n<p>拷贝当前对象</p>\n<p>Returns <strong><a href="#root">Root</a></strong> 一个新的实例</p>\n<h3 id="isequal"><a href="#isequal" aria-hidden="true"><span class="icon icon-link"></span></a>isEqual</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L125-L128" title="Source code on GitHub">src/Model/Root.js:125-128</a></p>\n<p>对比两个对象是否相同</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>other</code> <strong>any</strong> </li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript">Root.create().isEqual({}) <span class="hljs-comment">// true</span>\nRoot.create({ <span class="hljs-attr">a</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>] }).isEqual({ <span class="hljs-attr">a</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>] }) <span class="hljs-comment">// true</span>\nRoot.create({ <span class="hljs-attr">a</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>] }).isEqual(Root.create({ <span class="hljs-attr">a</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>] })) <span class="hljs-comment">// true</span></code></pre>\n<p>Returns <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></strong> </p>\n<h3 id="assign"><a href="#assign" aria-hidden="true"><span class="icon icon-link"></span></a>assign</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L139-L141" title="Source code on GitHub">src/Model/Root.js:139-141</a></p>\n<p>批量赋值</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>data</code> <strong>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a> | <a href="#root">Root</a>)</strong> </li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript">Root.create().assign({ <span class="hljs-attr">a</span>: <span class="hljs-string">\'a\'</span>, <span class="hljs-attr">b</span>: <span class="hljs-string">\'b\'</span> })</code></pre>\n<p>Returns <strong><a href="#root">Root</a></strong> </p>\n<h3 id="assigndeep"><a href="#assigndeep" aria-hidden="true"><span class="icon icon-link"></span></a>assignDeep</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L152-L155" title="Source code on GitHub">src/Model/Root.js:152-155</a></p>\n<ul>\n<li><strong>See: <a href="#assign">assign</a></strong></li>\n</ul>\n<p>深拷贝批量赋值</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>data</code> <strong>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a> | <a href="#root">Root</a>)</strong> </li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-keyword">const</span> a = Root.create().assignDeep({ <span class="hljs-attr">a</span>: <span class="hljs-string">\'a\'</span>, <span class="hljs-attr">b</span>: <span class="hljs-string">\'b\'</span> })</code></pre>\n<p>Returns <strong><a href="#root">Root</a></strong> </p>\n<h3 id="isempty"><a href="#isempty" aria-hidden="true"><span class="icon icon-link"></span></a>isEmpty</h3>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/Model/Root.js#L170-L177" title="Source code on GitHub">src/Model/Root.js:170-177</a></p>\n<ul>\n<li><strong>See: <a href="#assign">assign</a></strong></li>\n</ul>\n<p>判断当前实例是否内容为空</p>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript">Root.create().isEmpty() <span class="hljs-comment">// true</span>\nRoot.create({ <span class="hljs-attr">a</span>: <span class="hljs-string">\'\'</span>, <span class="hljs-attr">b</span>: [] }).isEmpty() <span class="hljs-comment">// true</span>\nRoot.create({ <span class="hljs-attr">a</span>: <span class="hljs-string">\'\'</span>, <span class="hljs-attr">b</span>: [], <span class="hljs-attr">c</span>: Root.create() }).isEmpty() <span class="hljs-comment">// true</span>\nRoot.create({ <span class="hljs-attr">a</span>: <span class="hljs-string">\'a\'</span>, <span class="hljs-attr">b</span>: [] }).isEmpty() <span class="hljs-comment">// false</span>\nRoot.create({ <span class="hljs-attr">a</span>: <span class="hljs-string">\'\'</span>, <span class="hljs-attr">b</span>: [<span class="hljs-string">\'a\'</span>] }).isEmpty() <span class="hljs-comment">// false</span></code></pre>\n<p>Returns <strong><a href="#root">Root</a></strong> </p>\n<h1 id="renderer"><a href="#renderer" aria-hidden="true"><span class="icon icon-link"></span></a>Renderer</h1>\n<p><code>React.createElement</code> 是不能渲染一个 ViewModel 实例的，\n于是便提供了渲染方法来渲染 vm。</p>\n<!-- Generated by documentation.js. Update this documentation by updating the source code. -->\n<h2 id="h"><a href="#h" aria-hidden="true"><span class="icon icon-link"></span></a>h</h2>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/renderer/mixedRenderer.js#L38-L52" title="Source code on GitHub">src/renderer/mixedRenderer.js:38-52</a></p>\n<p>可以渲染 Vm 实例的方法，类似于 <code>React.createElement</code></p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><code>model</code> <strong>(VmInstance | ReactComponent | <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</strong> </li>\n<li><code>propsOrClassName</code> <strong>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a> | <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</strong> </li>\n<li><code>props</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></strong> </li>\n<li><code>children</code> <strong>ReactElement</strong> </li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript">h(model, <span class="hljs-string">\'class-name\'</span>, {}, \n <span class="hljs-comment">// children</span>\n <span class="hljs-string">\'1\'</span>, <span class="hljs-string">\'2\'</span>\n);\nh.div({}, <span class="hljs-string">\'inner\'</span>)\nh(<span class="hljs-string">\'div\'</span>, {}, <span class="hljs-string">\'inner\'</span>)\nh(<span class="hljs-string">\'div\'</span>, <span class="hljs-string">\'classname\'</span>, {}, <span class="hljs-string">\'inner\'</span>)\nh(Component, <span class="hljs-string">\'classname\'</span>, {}, \n   h.span()\n)</code></pre>\n<p>Returns <strong>ReactElement</strong> </p>\n<h1 id="extension"><a href="#extension" aria-hidden="true"><span class="icon icon-link"></span></a>Extension</h1>\n<p>一些额外的扩展</p>\n<!-- Generated by documentation.js. Update this documentation by updating the source code. -->\n<h2 id="providerfactory"><a href="#providerfactory" aria-hidden="true"><span class="icon icon-link"></span></a>providerFactory</h2>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/extension/providerFactory.js#L25-L35" title="Source code on GitHub">src/extension/providerFactory.js:25-35</a></p>\n<p>用于产生一个 Provider，传入一个全局的 store</p>\n<p><strong>Examples</strong></p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-keyword">const</span> app = AppVM.create()\n<span class="hljs-keyword">const</span> Provider = providerFactory(app)\n\nReactDOM.render(\n   <span class="xml"><span class="hljs-tag">&#x3C;<span class="hljs-name">Provider</span>></span>\n     {...}\n   <span class="hljs-tag">&#x3C;/<span class="hljs-name">Provider</span>></span></span>,\n   <span class="hljs-built_in">window</span>.root\n)</code></pre>\n<h2 id="router"><a href="#router" aria-hidden="true"><span class="icon icon-link"></span></a>Router</h2>\n<p><a href="https://github.com/imcuttle/react-mobx-vm/blob/988b14293ee14a50f7e876dc8ae8532a1a3bb274/src/extension/RouterV3.js#L43-L45" title="Source code on GitHub">src/extension/RouterV3.js:43-45</a></p>\n<p>如果你依赖了 <strong>react-router v3</strong>，那么可以使用该 Router 定义，而不是 react-router 的 Router\n<strong>注意</strong> <code>import Router from \'react-mobx-vm/extension/RouterV3\'</code></p>\n',extra:{}}}});