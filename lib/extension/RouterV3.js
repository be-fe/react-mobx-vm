'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = VMRouter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixedRenderer = require('../renderer/mixedRenderer');

var _mixedRenderer2 = _interopRequireDefault(_mixedRenderer);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(props) {
  var components = props.components.map(function (comp) {
    if (comp && (typeof comp === 'undefined' ? 'undefined' : (0, _typeof3.default)(comp)) === 'object') {
      var f = function f() {};
      f['__[[actual]]__'] = comp;
      return f;
    }
    return comp;
  });
  return (0, _mixedRenderer2.default)(_reactRouter.RouterContext, (0, _extends3.default)({}, props, {
    components: components,
    createElement: function createElement(model) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref = props || {},
          children = _ref.children,
          rest = (0, _objectWithoutProperties3.default)(_ref, ['children']);

      if (model['__[[actual]]__']) {
        model = model['__[[actual]]__'];
      }
      return _mixedRenderer2.default.call(this, model, rest, children);
    }
  }));
} /**
   * @file: Router
   * @author: Cuttle Cong
   * @date: 2018/1/27
   * @description:
   */
function VMRouter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _mixedRenderer2.default)(_reactRouter.Router, (0, _extends3.default)({}, props, { render: render }));
}