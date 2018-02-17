'use strict';

exports.__esModule = true;
exports.isValidElement = undefined;
exports.isComponentInstance = isComponentInstance;
exports.isComponentClass = isComponentClass;
exports.assertReactClass = assertReactClass;
exports.convertReactElement = convertReactElement;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isValidElement = exports.isValidElement = _react2.default.isValidElement; /**
                                                                               * @file: reactUtils
                                                                               * @author: Cuttle Cong
                                                                               * @date: 2018/2/6
                                                                               * @description:
                                                                               */
function isComponentInstance(instance) {
  return instance && instance instanceof _react2.default.Component;
}

function isComponentClass(com) {
  return com && isComponentInstance(com.prototype);
}

function assertReactClass(Component, message) {
  if (!isComponentClass(Component)) {
    throw new Error(message + ' require ReactClass');
  }
}

/**
 * 转换 ReactElem
 * @param element
 * @param rules: [[cond, process]]
 * @param parent
 * @return element
 */
function convertReactElement(element) {
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var outerIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!element || rules.length === 0) {
    return element;
  }

  function convert(element, index, children) {
    rules.forEach(function (_ref) {
      var cond = _ref[0],
          handle = _ref[1];

      if (cond(element, index, parent, children)) {
        var handledElem = void 0;
        // eslint-disable-next-line no-cond-assign
        if (typeof (handledElem = handle(element, index, parent, children)) !== 'undefined') {
          element = handledElem;
        }
      }
    });

    // @thinking return element ?
    return element;
  }

  if (Array.isArray(element)) {
    return _react2.default.Children.toArray(element).map(function (elem, index) {
      return convertReactElement(elem, rules, parent, index);
    });
  }
  var children = element && element.props && element.props.children;
  var newElement = element;
  newElement = convert(element, outerIndex, children);
  // convert may update children
  var newChildren = newElement && newElement.props && newElement.props.children;
  if (newChildren) {
    newChildren = convertReactElement(newChildren, rules, newElement, outerIndex);
  }

  if (newElement === element && newChildren === children) {
    return element;
  }

  return _react2.default.isValidElement(newElement) ? _react2.default.cloneElement(newElement, newElement.props, newChildren) : newElement;
}

exports.isElementOf = function (Component) {

  // Trying to solve the problem with 'children: XXX.isRequired'
  // (https://github.com/gaearon/react-hot-loader/issues/710). This does not work for me :(
  var originalPropTypes = Component.propTypes;
  Component.propTypes = void 0;

  // Well known workaround
  var elementType = _react2.default.createElement(Component).type;

  // Restore originalPropTypes
  Component.propTypes = originalPropTypes;

  return function (element) {
    return element && element.type === elementType;
  };
};