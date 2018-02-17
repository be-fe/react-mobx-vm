'use strict';

exports.__esModule = true;

var _index = require('../utils/index');

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if ((0, _index.invokedWithArgs)(args)) {
    throw new Error('`autorun` don\'t need pass some arguments');
  }
  return _core2.default.apply(undefined, [{ initKey: 'init', exitKey: 'exit' }].concat(args));
}; /* eslint-disable */
/**
 * @file   autorun
 * @author yucong02
 */