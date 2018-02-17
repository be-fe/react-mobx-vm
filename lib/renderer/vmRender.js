'use strict';

exports.__esModule = true;
exports.default = renderer;

var _reactHyper = require('./reactHyper');

var _reactHyper2 = _interopRequireDefault(_reactHyper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @def: DevPattern.renderer: (model, props, ...children) => ReactElem
 *  model: ViewModelInstance
 *
 *      // 用于默认渲染该 model
 *      defaultComp: ReactClass
 *
 *  // 额外的用于 react 渲染的 props
 *  props: {} | undefined
 *
 *      // 可被用来替换掉 model.defaultComp, 代替它渲染当前 viewModel
 *      comp: ReactClass
 *
 *  // 子 elems
 *  children: ReactElem...
 */
function renderer(model) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!model) {
    return null;
  }
  props = props || {};
  var Comp = props.comp || model.defaultComp;
  props.local = model;
  props.key = props.key || model.viewId;

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return _reactHyper2.default.apply(undefined, [Comp, props].concat(children));
} /**
   * @file: model-renderer-v2.js
   * @author: Liang
   */