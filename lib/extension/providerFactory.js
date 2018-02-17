'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file: Provider
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */
exports.default = function (app) {
  return function Provider(_ref) {
    var children = _ref.children,
        props = (0, _objectWithoutProperties3.default)(_ref, ['children']);

    return _react2.default.createElement(_mobxReact.Provider, (0, _extends3.default)({}, props, {
      app: app
    }), children);
  };
};