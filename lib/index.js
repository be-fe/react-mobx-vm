'use strict';

exports.__esModule = true;
exports.providerFactory = exports.h = undefined;

var _index = require('./decorator/index');

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _Model = require('./Model');

Object.keys(_Model).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Model[key];
    }
  });
});

var _mixedRenderer = require('./renderer/mixedRenderer');

var _mixedRenderer2 = _interopRequireDefault(_mixedRenderer);

var _providerFactory2 = require('./extension/providerFactory');

var _providerFactory3 = _interopRequireDefault(_providerFactory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.h = _mixedRenderer2.default; /**
                                      * @file: index
                                      * @author: Cuttle Cong
                                      * @date: 2018/2/14
                                      * @description:
                                      */

exports.providerFactory = _providerFactory3.default;