'use strict';

exports.__esModule = true;
exports.storageSync = exports.registerUrlSync = exports.urlSync = exports.bindable = exports.binding = exports.autorun = exports.reaction = exports.stateless = exports.mapping = exports.inject = exports.injextExt = exports.bindView = exports.collect = undefined;

var _core = require('./urlSync/core');

Object.defineProperty(exports, 'registerUrlSync', {
  enumerable: true,
  get: function get() {
    return _core.register;
  }
});

var _collect2 = require('./collect');

var _collect3 = _interopRequireDefault(_collect2);

var _bindView2 = require('./bindView');

var _bindView3 = _interopRequireDefault(_bindView2);

var _injectExt = require('./injectExt');

var _injectExt2 = _interopRequireDefault(_injectExt);

var _injectInverseInherit = require('./injectInverseInherit');

var _injectInverseInherit2 = _interopRequireDefault(_injectInverseInherit);

var _mapping2 = require('./mapping');

var _mapping3 = _interopRequireDefault(_mapping2);

var _stateless2 = require('./stateless');

var _stateless3 = _interopRequireDefault(_stateless2);

var _reaction2 = require('./reaction');

var _reaction3 = _interopRequireDefault(_reaction2);

var _autorun2 = require('./autorun');

var _autorun3 = _interopRequireDefault(_autorun2);

var _binding2 = require('./binding');

var _binding3 = _interopRequireDefault(_binding2);

var _bindable2 = require('./binding/bindable');

var _bindable3 = _interopRequireDefault(_bindable2);

var _urlSync2 = require('./urlSync');

var _urlSync3 = _interopRequireDefault(_urlSync2);

var _storageSync2 = require('./storageSync');

var _storageSync3 = _interopRequireDefault(_storageSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.collect = _collect3.default; /**
                                      * @file: index
                                      * @author: Cuttle Cong
                                      * @date: 2018/2/14
                                      * @description:
                                      */

exports.bindView = _bindView3.default;
exports.injextExt = _injectExt2.default;
exports.inject = _injectInverseInherit2.default;
exports.mapping = _mapping3.default;
exports.stateless = _stateless3.default;
exports.reaction = _reaction3.default;
exports.autorun = _autorun3.default;
exports.binding = _binding3.default;
exports.bindable = _bindable3.default;
exports.urlSync = _urlSync3.default;
exports.storageSync = _storageSync3.default;