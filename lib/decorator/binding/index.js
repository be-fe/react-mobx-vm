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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _hasIn2 = require('lodash/hasIn');

var _hasIn3 = _interopRequireDefault(_hasIn2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

exports.default = binding;

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _bindable = require('./bindable');

var _reactUtils = require('../../utils/reactUtils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convert(element, fallbackScope) {
  return (0, _reactUtils.convertReactElement)(element, [[function cond(elem) {
    return elem && elem.props && elem.props['data-bind'];
  }, function (elem) {
    var bind = elem.props['data-bind'];
    var dataScope = elem.props['data-scope'] || fallbackScope;
    if (process.env.NODE_ENV !== 'production' && !(0, _mobx.isObservable)(dataScope)) {
      console.warn('[Warning] the scope of binding isn\'t observable.', dataScope);
    }

    if (!dataScope) {
      throw new Error('binding convert require data-scope, but ' + dataScope);
    }

    // dynamic bind
    if (typeof bind === 'function') {
      bind = bind(dataScope).toString();
    }

    var get = function get() {
      return (0, _get3.default)(dataScope, bind);
    };
    var set = (0, _mobx.action)(function (val) {
      (0, _set3.default)(dataScope, bind, val);
    });
    var ctx = {
      get: get,
      set: set,
      scope: dataScope,
      bind: bind
    };

    if (typeof bind === 'string' && (0, _hasIn3.default)(dataScope, bind) || typeof bind === 'function') {
      var handledProps = (0, _bindable.getHandledProps)(ctx, elem, elem.props);
      var newProps = (0, _extends3.default)({}, elem.props, handledProps);
      newProps['data-bind'] = newProps['data-scope'] = void 0;
      return React.cloneElement(elem, newProps);
    }

    console.warn('binding ' + bind + ' failed, Don\'t find the property in', dataScope);
    return elem;
  }]]);
} /**
   * @file: collect
   * @author: Cuttle Cong
   * @date: 2018/1/28
   * @description:
   */


function isMemberMethod() {
  return arguments.length === 3 && (0, _typeof3.default)(arguments[0]) === 'object' && !React.isValidElement(arguments[0]) && typeof arguments[1] === 'string' && (0, _typeof3.default)(arguments[2]) === 'object' && !React.isValidElement(arguments[2]);
}

function bindMemberMethod(maybeScope) {
  return function () {
    // @binding member method
    if (isMemberMethod.apply(this, arguments)) {
      var descriptor = arguments[2];
      if ('value' in descriptor && typeof descriptor.value === 'function') {
        return (0, _extends3.default)({}, descriptor, {
          value: function value() {
            return convert(descriptor.value.apply(this, arguments), maybeScope || this.local);
          }
        });
      }
      if ('get' in descriptor) {
        return (0, _extends3.default)({}, descriptor, {
          get: function get() {
            return convert(descriptor.get.call(this), maybeScope || this.local);
          }
        });
      }
      // getter
      throw new Error('@binding member method or getter, but ' + JSON.stringify(descriptor));
    }
  };
}

function bindClassOrFunc(maybeScope) {
  return function (element) {
    if ((0, _reactUtils.isComponentClass)(element)) {
      var Binding = function (_element) {
        (0, _inherits3.default)(Binding, _element);

        function Binding() {
          (0, _classCallCheck3.default)(this, Binding);
          return (0, _possibleConstructorReturn3.default)(this, _element.apply(this, arguments));
        }

        Binding.prototype.render = function render() {
          return convert(_element.prototype.render.call(this), maybeScope || this.local);
        };

        return Binding;
      }(element);

      return (0, _mobxReact.observer)(Binding);
    }
    if (typeof element === 'function') {
      return (0, _mobxReact.observer)(function WrappedBinding() {
        // maybeScope -> scope
        return convert(element.apply(this, arguments), maybeScope || this.local);
      });
    }
  };
}

/**
 * @example
 *      1. use in class wrap  @binding(?scope) Component
 *      2. use in element wrap  binding(...element)
 *      3. use in element wrap  binding(scope)(...element)
 *      4. use in member render method or getter element
 * @param element
 * @return View
 */
function binding(element) {

  var newClass = bindClassOrFunc.apply(this, [null]).apply(this, arguments);
  if (newClass) {
    return newClass;
  }

  // @binding member method
  var descriptor = bindMemberMethod.apply(this, [null]).apply(this, arguments);
  if (descriptor) {
    return descriptor;
  }

  // binding(scope)(...element)
  if (element !== null && (typeof element === 'undefined' ? 'undefined' : (0, _typeof3.default)(element)) === 'object' && !React.isValidElement(element)
  // @thinking
  && (0, _mobx.isObservable)(element)) {
    return function bindedScope() {
      // @binding(scope)(Component)
      if (arguments.length === 1 && typeof arguments[0] === 'function') {
        return bindClassOrFunc.apply(this, [element]).apply(this, arguments);
      }
      // @binding(scope) memberMethod
      if (isMemberMethod.apply(this, arguments)) {
        return bindMemberMethod.apply(this, [element]).apply(this, arguments);
      }
      if (arguments.length === 0) {
        return;
      }
      return convert(arguments.length === 1 ? arguments[0] : [].concat(Array.prototype.slice.call(arguments)), element);
    };
  }

  return arguments.length === 1 ? convert(element) : convert([].concat(Array.prototype.slice.call(arguments)));
}