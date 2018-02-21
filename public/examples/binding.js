webpackJsonp([6,14],{1197:function(e,s,a){e.exports={content:'<div class="picidae-toc">\n<ul>\n<li>\n<a href="#%E7%AE%80%E5%8D%95%E4%BE%8B%E5%AD%90">简单例子</a>\n</li>\n<li>\n<a href="#bindable-%E4%BE%8B%E5%AD%90">Bindable 例子</a>\n</li>\n</ul>\n</div>\n<hr>\n<h3 id="简单例子"><a href="#%E7%AE%80%E5%8D%95%E4%BE%8B%E5%AD%90" aria-hidden="true"><span class="icon icon-link"></span></a>简单例子</h3>\n<p>下面例子可编辑</p>\n<div class="transformer-react-render-container"><pre><code class="hljs language-jsx" data-query="{&#x22;editable&#x22;:true,&#x22;placement&#x22;:&#x22;bottom&#x22;}" data-lang="jsx "><span class="hljs-keyword">import</span> * as <span class="hljs-type">React</span> from <span class="hljs-symbol">\'reac</span>t\'\n<span class="hljs-keyword">import</span> { h, binding, observable } from <span class="hljs-symbol">\'react</span>-mobx-vm\'\n\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Scope</span> </span>{\n  <span class="hljs-meta">@observable</span> inputList = [<span class="hljs-symbol">\'ab</span>c\', <span class="hljs-symbol">\'de</span>f\']\n}\nconst scope = <span class="hljs-keyword">new</span> <span class="hljs-type">Scope</span>()\n\n<span class="hljs-meta">@binding</span>\nexport <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">View</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{\n    render() {\n        <span class="hljs-keyword">return</span> (\n          &#x3C;div>\n          {\n            scope.inputList.map(\n              (input, i) => \n                &#x3C;input key={i} data-bind={i} data-scope={scope.inputList} />\n            )\n          }\n          &#x3C;/div>\n        )\n    }\n}</code></pre><transformer-react-render data-id="0"></transformer-react-render></div>\n<hr>\n<h3 id="bindable-例子"><a href="#bindable-%E4%BE%8B%E5%AD%90" aria-hidden="true"><span class="icon icon-link"></span></a>Bindable 例子</h3>\n<p>下面例子可编辑</p>\n<div class="transformer-react-render-container"><pre><code class="hljs language-jsx" data-query="{&#x22;editable&#x22;:true,&#x22;placemen&#x22;:&#x22;bottom&#x22;}" data-lang="jsx "><span class="hljs-keyword">import</span> {\n  h,\n  binding,\n  <span class="hljs-type">Root</span>,\n  bindView,\n  bindable,\n  observable,\n  <span class="hljs-type">DEFAULT_OPTIONS</span>\n} from <span class="hljs-symbol">\'react</span>-mobx-vm\'\n\nbindable([{\n  cond: function (props) {\n    <span class="hljs-keyword">return</span> props.<span class="hljs-keyword">type</span> === <span class="hljs-symbol">\'checkbo</span>x\'\n  },\n  prop: [\n    [<span class="hljs-symbol">\'checke</span>d\', function (modelValue, propVal, props) {\n      <span class="hljs-keyword">return</span> modelValue.includes(props.name)\n    }]\n  ],\n  event: [\n    [<span class="hljs-symbol">\'onChang</span>e\', function (evt, ctx) {\n      const { target: { name, checked } } = evt\n      const list = ctx.get()\n      let i = list.indexOf(name)\n      i >= <span class="hljs-number">0</span> &#x26;&#x26; list.splice(i, <span class="hljs-number">1</span>)\n      <span class="hljs-keyword">if</span> (checked) {\n        list.push(name)\n      }\n    }]\n  ]\n  <span class="hljs-comment">// 需要拼接上 DEFAULT_OPTIONS，这样才能保证 input[type=text] 可以正常binding</span>\n}].concat(<span class="hljs-type">DEFAULT_OPTIONS</span>), <span class="hljs-symbol">\'inpu</span>t\')\n\n<span class="hljs-comment">/* 这里为单向绑定，只有数据的输入 */</span>\nconst <span class="hljs-type">JSONView</span> = bindable({\n  prop: [<span class="hljs-symbol">\'jso</span>n\']\n}, ({ json }) => &#x3C;pre>&#x3C;code>{<span class="hljs-type">JSON</span>.stringify(json, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>)}&#x3C;/code>&#x3C;/pre>)\n\n<span class="hljs-meta">@binding</span>\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">View</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{\n  render() {\n    <span class="hljs-keyword">return</span> (\n      &#x3C;div>\n        &#x3C;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"text"</span> data-bind=<span class="hljs-string">"value"</span> />\n        &#x3C;br/>\n        &#x3C;input id=<span class="hljs-string">"test"</span> data-bind=<span class="hljs-string">"value"</span>/>\n        &#x3C;br/>\n        &#x3C;<span class="hljs-type">JSONView</span> data-bind=<span class="hljs-string">"checkedList"</span> />\n        &#x3C;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span> id=<span class="hljs-string">"a_0"</span> data-bind=<span class="hljs-string">"checkedList"</span> name={\'a\'}/>\n        &#x3C;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span> id=<span class="hljs-string">"a_1"</span> data-bind=<span class="hljs-string">"checkedList"</span> name={\'a\'}/>\n        &#x3C;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span> id=<span class="hljs-string">"b_0"</span> data-bind=<span class="hljs-string">"checkedList"</span> name={\'b\'}/>\n      &#x3C;/div>\n    )\n  }\n}\n\n<span class="hljs-meta">@bindView</span>(<span class="hljs-type">View</span>)\n<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Scope</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Root</span> </span>{\n  <span class="hljs-meta">@observable</span> value = <span class="hljs-symbol">\'va</span>l\'\n  <span class="hljs-meta">@observable</span> checkedList = []\n}\nconst scope = <span class="hljs-type">Scope</span>.create({ value: <span class="hljs-symbol">\'hh</span>h\', checkedList: [\'b\'] })\n\nexport <span class="hljs-keyword">default</span> h(scope)</code></pre><transformer-react-render data-id="1"></transformer-react-render></div>\n',extra:{},"transformer-react-render":{list:[['function anonymous(React,Component,ReactDOM,require\n/*``*/) {\n\nvar exports = {}, module = {};\nmodule.exports = exports;\n(function picidaeTransformerReactRender(){Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _createClass2=require("babel-runtime/helpers/createClass");var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn");var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require("babel-runtime/helpers/inherits");var _inherits3=_interopRequireDefault(_inherits2);var _classCallCheck2=require("babel-runtime/helpers/classCallCheck");var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _desc,_value,_class,_descriptor,_class3;var _react=require("react");var React=_interopRequireWildcard(_react);var _reactMobxVm=require("react-mobx-vm");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0})}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object["ke"+"ys"](descriptor).forEach(function(key){desc[key]=descriptor[key]});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if("value"in desc||desc.initializer){desc.writable=true}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined}if(desc.initializer===void 0){Object["define"+"Property"](target,property,desc);desc=null}return desc}function _initializerWarningHelper(descriptor,context){throw new Error("Decorating class property failed. Please ensure that transform-class-properties is enabled.")}var Scope=(_class=function Scope(){(0,_classCallCheck3.default)(this,Scope);_initDefineProp(this,"inputList",_descriptor,this)},(_descriptor=_applyDecoratedDescriptor(_class.prototype,"inputList",[_reactMobxVm.observable],{enumerable:true,initializer:function initializer(){return["abc","def"]}})),_class);var scope=new Scope;var View=(0,_reactMobxVm.binding)(_class3=function(_React$Component){(0,_inherits3.default)(View,_React$Component);function View(){(0,_classCallCheck3.default)(this,View);return(0,_possibleConstructorReturn3.default)(this,(View.__proto__||Object.getPrototypeOf(View)).apply(this,arguments))}(0,_createClass3.default)(View,[{key:"render",value:function render(){return React.createElement("div",null,scope.inputList.map(function(input,i){return React.createElement("input",{key:i,"data-bind":i,"data-scope":scope.inputList})}))}}]);return View}(React.Component))||_class3;exports.default=View})(exports, module)\nreturn module.exports.default || module.exports;\n}',{editable:!0,placement:"bottom"},2],['function anonymous(React,Component,ReactDOM,require\n/*``*/) {\n\nvar exports = {}, module = {};\nmodule.exports = exports;\n(function picidaeTransformerReactRender(){Object.defineProperty(exports,"__esModule",{value:true});var _classCallCheck2=require("babel-runtime/helpers/classCallCheck");var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require("babel-runtime/helpers/createClass");var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn");var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require("babel-runtime/helpers/inherits");var _inherits3=_interopRequireDefault(_inherits2);var _class,_dec,_class2,_desc,_value,_class3,_descriptor,_descriptor2;var _reactMobxVm=require("react-mobx-vm");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0})}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object["ke"+"ys"](descriptor).forEach(function(key){desc[key]=descriptor[key]});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if("value"in desc||desc.initializer){desc.writable=true}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined}if(desc.initializer===void 0){Object["define"+"Property"](target,property,desc);desc=null}return desc}function _initializerWarningHelper(descriptor,context){throw new Error("Decorating class property failed. Please ensure that transform-class-properties is enabled.")}(0,_reactMobxVm.bindable)([{cond:function cond(props){return props.type==="checkbox"},prop:[["checked",function(modelValue,propVal,props){return modelValue.includes(props.name)}]],event:[["onChange",function(evt,ctx){var _evt$target=evt.target,name=_evt$target.name,checked=_evt$target.checked;var list=ctx.get();var i=list.indexOf(name);i>=0&&list.splice(i,1);if(checked){list.push(name)}}]]// 需要拼接上 DEFAULT_OPTIONS，这样才能保证 input[type=text] 可以正常binding\n}].concat(_reactMobxVm.DEFAULT_OPTIONS),"input");/* 这里为单向绑定，只有数据的输入 */var JSONView=(0,_reactMobxVm.bindable)({prop:["json"]},function(_ref){var json=_ref.json;return React.createElement("pre",null,React.createElement("code",null,JSON.stringify(json,null,2)))});var View=(0,_reactMobxVm.binding)(_class=function(_React$Component){(0,_inherits3.default)(View,_React$Component);function View(){(0,_classCallCheck3.default)(this,View);return(0,_possibleConstructorReturn3.default)(this,(View.__proto__||Object.getPrototypeOf(View)).apply(this,arguments))}(0,_createClass3.default)(View,[{key:"render",value:function render(){return React.createElement("div",null,React.createElement("input",{type:"text",id:"text","data-bind":"value"}),React.createElement("br",null),React.createElement("input",{id:"test","data-bind":"value"}),React.createElement("br",null),React.createElement(JSONView,{"data-bind":"checkedList"}),React.createElement("input",{type:"checkbox",id:"a_0","data-bind":"checkedList",name:"a"}),React.createElement("input",{type:"checkbox",id:"a_1","data-bind":"checkedList",name:"a"}),React.createElement("input",{type:"checkbox",id:"b_0","data-bind":"checkedList",name:"b"}))}}]);return View}(React.Component))||_class;var Scope=(_dec=(0,_reactMobxVm.bindView)(View),_dec(_class2=(_class3=function(_Root){(0,_inherits3.default)(Scope,_Root);function Scope(){var _ref2;var _temp,_this2,_ret;(0,_classCallCheck3.default)(this,Scope);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this2=(0,_possibleConstructorReturn3.default)(this,(_ref2=Scope.__proto__||Object.getPrototypeOf(Scope)).call.apply(_ref2,[this].concat(args))),_this2),_initDefineProp(_this2,"value",_descriptor,_this2),_initDefineProp(_this2,"checkedList",_descriptor2,_this2),_temp),(0,_possibleConstructorReturn3.default)(_this2,_ret)}return Scope}(_reactMobxVm.Root),(_descriptor=_applyDecoratedDescriptor(_class3.prototype,"value",[_reactMobxVm.observable],{enumerable:true,initializer:function initializer(){return"val"}}),_descriptor2=_applyDecoratedDescriptor(_class3.prototype,"checkedList",[_reactMobxVm.observable],{enumerable:true,initializer:function initializer(){return[]}})),_class3))||_class2);var scope=Scope.create({value:"hhh",checkedList:["b"]});exports.default=(0,_reactMobxVm.h)(scope)})(exports, module)\nreturn module.exports.default || module.exports;\n}',{editable:!0,placemen:"bottom"},9]],pkg:{react:a(5),"react-dom":a(144),"babel-runtime/helpers/createClass":a(17),"babel-runtime/helpers/possibleConstructorReturn":a(14),"babel-runtime/helpers/inherits":a(13),"babel-runtime/helpers/classCallCheck":a(11),"react-mobx-vm":a(62)}}}}});