'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function (urlKeyOrTarget, property, descriptor) {
  if ((0, _utils.invokedWithArgs)(arguments)) {
    var options = property;
    return function (target, property, descriptor) {
      return (0, _core2.default)(urlKeyOrTarget || property, (0, _extends3.default)({}, keyMap, options), target, property, descriptor);
    };
  }

  return (0, _core2.default)(property, keyMap, urlKeyOrTarget, property, descriptor);
};

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */

var keyMap = {
  initKey: 'componentDidMount',
  updateKey: 'componentWillReceiveProps',
  exitKey: 'componentWillUnmount'
};