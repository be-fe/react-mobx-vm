'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.invokedWithArgs = invokedWithArgs;
exports.newError = newError;
exports.invokedWithArgsForClass = invokedWithArgsForClass;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file   index
 * @author yucong02
 */

/** global: __DEVELOPMENT__ */

function invokedWithArgs(args) {
  return args.length !== 3 || (0, _typeof3.default)(args[0]) !== 'object' || typeof args[1] !== 'string' || (0, _typeof3.default)(args[2]) !== 'object';
}

function newError(type, message) {
  return new Error('@' + type + ': ' + message);
}

function invokedWithArgsForClass(args) {
  return args.length !== 1 || typeof args[0] !== 'function';
}