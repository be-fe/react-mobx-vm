'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = mapping;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

var _mobx = require('mobx');

var _reactUtils = require('../utils/reactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file: collect
 * @author: Cuttle Cong
 * @date: 2018/1/28
 * @description:
 */
var assign = (0, _mobx.action)(function (rule, props, model) {
  // @action
  function setValue(model, path, value) {
    (0, _set2.default)(model, path, value);
  }

  var oldVal = void 0;
  var newVal = void 0;
  if (typeof rule === 'string') {
    oldVal = (0, _get2.default)(model, rule);
    newVal = (0, _get2.default)(props, rule);
    if (newVal !== oldVal) {
      setValue(model, rule, newVal);
    }
  } else if (Array.isArray(rule)) {
    rule.forEach(function (eachRule) {
      return assign(eachRule, props, model);
    });
  } else if ((typeof rule === 'undefined' ? 'undefined' : (0, _typeof3.default)(rule)) === 'object') {
    for (var propPath in rule) {
      if (rule.hasOwnProperty(propPath)) {
        oldVal = (0, _get2.default)(model, rule[propPath]);
        newVal = (0, _get2.default)(props, propPath);
        if (newVal !== oldVal) {
          setValue(model, rule[propPath], newVal);
        }
      }
    }
  }
});

/**
 * 将 View 层的 props 映射同步至 model
 * @param mapper {Array|Object|string}
 *      { propName: modelName } | [string, object]
 * @return View
 */
function mapping(mapper) {
  if (!Array.isArray(mapper) && (typeof mapper === 'undefined' ? 'undefined' : (0, _typeof3.default)(mapper)) !== 'object' && typeof mapper !== 'string') {
    throw new TypeError('@mapping(mapper): mapper require Array String or Object, but ' + (typeof mapper === 'undefined' ? 'undefined' : (0, _typeof3.default)(mapper)));
  }

  return function mappingCore(Component) {
    (0, _reactUtils.assertReactClass)(Component, 'mapping');

    var Mapping = function (_Component) {
      (0, _inherits3.default)(Mapping, _Component);

      function Mapping() {
        (0, _classCallCheck3.default)(this, Mapping);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
      }

      Mapping.prototype.componentWillMount = function componentWillMount() {
        assign(mapper, this.props, this.local);
        _Component.prototype.componentWillMount && _Component.prototype.componentWillMount.apply(this, arguments);
      };

      Mapping.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        assign(mapper, newProps, newProps.local);
        _Component.prototype.componentWillReceiveProps && _Component.prototype.componentWillReceiveProps.apply(this, arguments);
      };

      return Mapping;
    }(Component);

    return Mapping;
  };
}