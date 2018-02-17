'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _vmRender = require('./vmRender');

var _vmRender2 = _interopRequireDefault(_vmRender);

var _reactHyper = require('./reactHyper');

var _reactHyper2 = _interopRequireDefault(_reactHyper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 即可以 render ViewModel 也可以 render React Component
 * r -> model, props = {}, ...children
 * h -> tagOrComp, classNameOrProps, props = undefined, ...content
 */
/**
 * @file: mixedRenderer
 * @author: Cuttle Cong
 * @date: 2018/1/27
 * @description:
 */
function mixedRenderer(model, propsOrClassName, props) {
  for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    children[_key - 3] = arguments[_key];
  }

  if (model && (typeof model === 'undefined' ? 'undefined' : (0, _typeof3.default)(model)) === 'object') {
    if (typeof propsOrClassName === 'string') {
      propsOrClassName = { className: propsOrClassName };
      props = props || {};
      props = (0, _extends3.default)({}, props, propsOrClassName);
    } else {
      children = [props].concat(children);
      props = propsOrClassName;
    }
    return _vmRender2.default.apply(this, [model, props].concat(children));
  }
  return _reactHyper2.default.apply(this, arguments);
}

Object.assign(mixedRenderer, _reactHyper2.default);

exports.default = mixedRenderer;