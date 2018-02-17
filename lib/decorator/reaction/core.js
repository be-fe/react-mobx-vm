'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _hasIn2 = require('lodash/hasIn');

var _hasIn3 = _interopRequireDefault(_hasIn2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _mobx = require('mobx');

var _index = require('../utils/index');

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  for (var _len = arguments.length, keyNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keyNames[_key - 1] = arguments[_key];
  }

  var _ref$init = _ref.init,
      init = _ref$init === undefined ? 'init' : _ref$init,
      _ref$exit = _ref.exit,
      exit = _ref$exit === undefined ? 'exit' : _ref$exit;

  if (!keyNames.length) {
    throw new Error('`reaction` should pass some refPaths');
  }

  var exited = {};
  keyNames = keyNames.filter(function (x) {
    if (exited[x]) {
      return false;
    }
    exited[x] = true;
    return true;
  });

  return function (target, property, descriptor) {
    if (typeof target[property] !== 'function') {
      throw new Error('`reaction` should used in member method');
    }

    var dispose = void 0;
    var originInit = target[init];
    target[init] = (0, _mobx.action)(function () {
      var _this = this;

      _logger2.default.debug('reaction initialized : ' + property);
      // 置前的原因请参考 autorun 置前的原因
      var rlt = originInit && originInit.apply(this, arguments);

      dispose = (0, _mobx.reaction)(function () {
        return keyNames.map(function (refPath) {
          if (!(0, _hasIn3.default)(_this, refPath)) {
            throw new Error('The reference path: ' + refPath + ' is not found.');
          }
          return (0, _get3.default)(_this, refPath);
        });
      }, function (args) {
        return target[property].apply(_this, args.concat(dispose));
      });
      return rlt;
    });

    var originExit = target[exit];
    target[exit] = function () {
      _logger2.default.debug('dispose reaction : ' + property);
      dispose && dispose();
      return originExit && originExit.apply(this, arguments);
    };

    return descriptor && (0, _extends3.default)({}, descriptor, { configurable: true });
  };
}; /**
    * @file   reaction
    * @author yucong02
    */