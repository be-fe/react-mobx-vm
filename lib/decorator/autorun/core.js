'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mobx = require('mobx');

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file   autorun
 * @author yucong02
 */
exports.default = function () {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments[1];
  var property = arguments[2];
  var description = arguments[3];
  var _opt$initKey = opt.initKey,
      initKey = _opt$initKey === undefined ? 'init' : _opt$initKey,
      _opt$exitKey = opt.exitKey,
      exitKey = _opt$exitKey === undefined ? 'exit' : _opt$exitKey;

  if (typeof target[property] === 'function') {
    var release = function release() {
      // logger.debug('dispose autorun `' + property + '`')
      dispose && dispose();
      dispose = null;
    };

    var wrapMethod = function wrapMethod(method, callback) {
      return function () {
        // autorun 在 urlsync 后面执行
        var rlt = method && method.apply(this, arguments);
        callback && callback.call(this);
        return rlt;
      };
    };

    var dispose = void 0;

    target[exitKey] = wrapMethod(target[exitKey], function () {
      release();
    });

    target[initKey] = wrapMethod(target[initKey], function () {
      var _this = this;

      if (dispose) {
        return;
      }
      // logger.debug('load autorun `' + property + '`')
      dispose = (0, _mobx.autorun)(function () {
        target[property].call(_this, dispose);
      });
    });
  } else {
    throw new Error('`autorun` should be used in member method');
  }

  return description && (0, _extends3.default)({}, description, { configurable: true });
};