'use strict';

exports.__esModule = true;
exports.default = hyper;

var _react = require('react');

var tags = ['div', 'span', 'a', 'img', 'pre', 'br', 'hr',

// 标题
'h1', 'h2', 'h3', 'h4', 'h5', 'h6',

// 表格相关
'table', 'thead', 'tbody', 'th', 'tr', 'td',

// 文档语义化
'aside', 'header', 'footer', 'section', 'article',

// 行内样式
'em', 'strong',

// 不建议使用
'i', 'b',

// 表单
'label', 'input', 'button', 'textarea', 'p', 'select', 'option', 'form',

// 列表
'ul', 'ol', 'li',

// media
'video', 'audio', 'iframe', 'colgroup', 'col', 'area', 'link']; /**
                                                                 * @file: react-hyper
                                                                 * @author: Cuttle Cong
                                                                 * @date: 2018/2/13
                                                                 * @description:
                                                                 */
function hyper(tagName, classNameOrProps, props) {
  for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    children[_key - 3] = arguments[_key];
  }

  if (typeof classNameOrProps === 'string') {
    props = props || {};
    props.className = props.className || classNameOrProps;
    return _react.createElement.apply(this, [tagName, props].concat(children));
  }
  return _react.createElement.apply(this, arguments);
}

tags.forEach(function (tag) {
  hyper[tag] = hyper.bind(null, tag);
});