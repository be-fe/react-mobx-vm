'use strict';

exports.__esModule = true;
exports.default = proxy;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file: proxy
 * @author: Cuttle Cong
 * @date: 2018/1/23
 * @description:
 */
function proxy(host, path, getValue) {
  var old = (0, _get2.default)(host, path);
  var newVal = getValue(old);
  (0, _set2.default)(host, path, newVal);
  return newVal;
}