'use strict';

exports.__esModule = true;
exports.DEFAULT_OPTIONS = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.unBindable = unBindable;
exports.getOptionsList = getOptionsList;
exports.getHandledProps = getHandledProps;
exports.default = bindable;

var _reactUtils = require('../../utils/reactUtils');

var _proxy = require('../../utils/proxy');

var _proxy2 = _interopRequireDefault(_proxy);

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbol = typeof Symbol === 'function' ? Symbol('bindable') : '__[[bindable]]__'; /**
                                                                                      * @file: bindable
                                                                                      * @author: Cuttle Cong
                                                                                      * @date: 2018/2/7
                                                                                      * @description:
                                                                                      */


var bindableTags = {};
function unBindable(CompOrTagName) {
  if (typeof CompOrTagName === 'string') {
    delete bindableTags[CompOrTagName];
  } else if ((0, _reactUtils.isComponentClass)(CompOrTagName)) {
    delete CompOrTagName[symbol];
  }
}

function normalize(value) {
  // 支持 string
  if (typeof value === 'string') {
    return [[value]];
  }

  if (Array.isArray(value)) {
    value = value.map(function (val) {
      if (Array.isArray(val)) {
        return val;
      }
      return [val];
    });
    return value;
  }
  throw new TypeError('bindable options requires string or array, but ' + (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)));
}

function normalizeOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (Array.isArray(options)) {
    return options.map(function (opt) {
      return normalizeOptions(opt);
    });
  }

  var _options$prop = options.prop,
      prop = _options$prop === undefined ? [] : _options$prop,
      _options$event = options.event,
      event = _options$event === undefined ? [] : _options$event,
      rest = (0, _objectWithoutProperties3.default)(options, ['prop', 'event']);

  prop = normalize(prop);
  event = normalize(event);
  return (0, _extends3.default)({
    prop: prop,
    event: event
  }, rest);
}

var DEFAULT_OPTIONS = exports.DEFAULT_OPTIONS = normalizeOptions({
  // 该批次 process 的条件判断
  cond: null,
  // value 对应的属性名
  prop: ['value'],
  // value 改变的事件名
  event: ['onChange']
});

/**
 *
 * @param Component elem/Comp/tagName
 * @return {*}
 */
function getOptionsList(Component) {
  if (React.isValidElement(Component)) {
    return Component.type && getOptionsList(Component.type);
  }
  if (typeof Component === 'string') {
    return bindableTags[Component.toLowerCase()];
  }
  return Component && Component[symbol];
}

function getHandledProps(ctx, elementOrComponent, oldProps) {
  var optList = getOptionsList(elementOrComponent) || [DEFAULT_OPTIONS];

  var props = (0, _extends3.default)({}, oldProps);
  optList.some(function (opt) {
    if (typeof opt.cond === 'function' && !opt.cond(oldProps, ctx)) {
      return false;
    }
    opt.prop.forEach(function (_ref) {
      var name = _ref[0],
          transform = _ref[1];

      if (typeof transform !== 'function') {
        transform = function transform(v) {
          return v;
        };
      }
      // overwrite value
      props[name] = transform(ctx.get(), oldProps[name], oldProps, ctx);
    });

    opt.event.forEach(function (_ref2) {
      var name = _ref2[0],
          handle = _ref2[1];

      if (typeof handle !== 'function') {
        handle = function handle(event) {
          return (0, _typeof3.default)(event.target) === 'object' && 'value' in event.target ? event.target.value : event;
        };
      }
      (0, _proxy2.default)(props, name, function (onChange) {
        return function (event) {
          var rlt = onChange && onChange.apply(this, arguments);
          if (rlt !== false) {
            // continue, not skip
            var newValue = handle.apply(this, [event, ctx]);

            // handle will be regard as transform
            // when return something
            if (typeof newValue !== 'undefined') {
              ctx.set(newValue);
            }
          } else {
            return rlt;
          }
        };
      });
    });
    return true;
  });

  return props;
}

/**
 *
 * @param options
 * @param tagName {String|Function}
 * @return {Bindable}
 */
function bindable(options, tagName) {
  options = options || DEFAULT_OPTIONS;
  options = normalizeOptions(options);
  if (!Array.isArray(options)) {
    options = [options];
  }

  if (typeof tagName === 'string') {
    bindableTags[tagName.toLowerCase()] = options;
    return;
  }
  if (typeof tagName === 'function') {
    tagName[symbol] = options;
    return tagName;
  }

  return function Bindable(Component) {
    Component[symbol] = options;
    return Component;
  };
}