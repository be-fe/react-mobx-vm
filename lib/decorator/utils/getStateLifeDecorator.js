'use strict';

exports.__esModule = true;
exports.assignState = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assignState = exports.assignState = (0, _mobx.action)(function (self, property, val) {
  var setVal = function setVal() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : val;

    if (self[property] !== value) {
      // console.log(name + ' set', property, value)
      self[property] = value;
    }
  };

  if (typeof val !== 'undefined') {
    // console.log('before load url: `' + property + '`:', this[property]);
    if (val == null) {
      setVal();
    } else if ((0, _typeof3.default)(self[property]) === 'object' && self[property] !== null) {
      if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
        if (self[property] instanceof Array) {
          setVal();
        } else {
          var Class = self[property].constructor;
          // 细化赋值操作，
          // 防止 state change -> url change
          // -> update -> state change (新的实例)
          if (typeof self[property].assign === 'function') {
            self[property].assign(val);
          } else {
            setVal(new Class(val));
          }
        }
      }
    } else if (typeof self[property] === 'number') {
      setVal(parseFloat(val));
    } else if (typeof self[property] === 'boolean') {
      setVal(typeof val === 'boolean' ? val : val === 'true');
    } else {
      setVal();
    }

    // console.log('after loaded url: `' + property + '`:', this[property]);
  }
}); /**
     * @file: stateLife
     * @author: Cuttle Cong
     * @date: 2018/2/4
     * @description:
     */

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'state-life';

  config = config || {};

  return function (urlKey) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var target = arguments[2];
    var property = arguments[3];
    var descriptor = arguments[4];

    if (typeof urlKey !== 'string') {
      options = urlKey;
      urlKey = property;
    }
    options = options || {};
    var _options = options,
        _options$initKey = _options.initKey,
        initKey = _options$initKey === undefined ? 'init' : _options$initKey,
        _options$exitKey = _options.exitKey,
        exitKey = _options$exitKey === undefined ? 'exit' : _options$exitKey,
        updateKey = _options.updateKey;

    var assignStateValue = function assignStateValue() {
      return assignState.call(null, this, property, config.get(urlKey));
    };

    if (typeof target[property] === 'function') {
      throw new Error('`' + name + '` can NOT use in member method');
    } else {

      // eslint-disable-next-line no-inner-declarations
      var release = function release() {
        dispose && dispose();
        dispose = null;
        if (syncUrlTimer) {
          clearTimeout(syncUrlTimer);
          _syncUrlFn && _syncUrlFn();
          syncUrlTimer = void 0;
          _syncUrlFn = void 0;
        }
      };

      // eslint-disable-next-line no-inner-declarations,no-unused-vars
      var init = function init(origin, actionType) {
        return (0, _mobx.action)(function () {
          var _this = this;

          config.init && config.init(this, property, urlKey);

          // console.log(actionType + ' ' + name + ' `' + property + '`')
          release();

          if (!(0, _mobx.isObservable)(this, property)) {
            var _extendObservable;

            console.warn('`' + property + '` is not observable, `' + name + '` setting it to be observable');
            (0, _mobx.extendObservable)(this, (_extendObservable = {}, _extendObservable[property] = this[property], _extendObservable));
          }

          assignStateValue.call(this);

          var isFirst = true;
          dispose = (0, _mobx.autorun)(function () {
            var _obj;

            // 一段时间内的修改以最后一次为准
            if (syncUrlTimer) {
              clearTimeout(syncUrlTimer);
              syncUrlTimer = void 0;
            }

            var obj = (_obj = {}, _obj[urlKey] = _this[property], _obj);
            // invoke the deep `getter` of this[property]
            // noop op
            try {
              JSON.stringify(obj);
            } catch (err) {
              console.error('[Stringify]', obj, 'Error happened:', err);
            }

            _syncUrlFn = function syncUrlFn() {
              var isFirst = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

              var save = isFirst ? config.saveFirstTime || config.save : config.save;
              save.call(config, urlKey, _this[property], config.fetch());
              syncUrlTimer = void 0;
              _syncUrlFn = void 0;
            };

            if (isFirst) {
              if (options.initialWrite) {
                _syncUrlFn(true);
              }
              isFirst = false;
              return;
            }

            syncUrlTimer = setTimeout(_syncUrlFn, 250);
          });

          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return origin && origin.call.apply(origin, [this].concat(args));
        });
      };

      var dispose = void 0;
      var syncUrlTimer = void 0;
      var _syncUrlFn = void 0;

      var originExit = target[exitKey];
      target[exitKey] = function () {
        config.exit && config.exit(this, property, urlKey);
        // console.log('dispose ' + name + ' `' + property + '`')
        release();

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return originExit && originExit.call.apply(originExit, [this].concat(args));
      };

      // eslint-disable-next-line no-use-before-define
      target[initKey] = init(target[initKey], 'init');

      if (updateKey) {
        target[updateKey] = function (origin) {
          return (0, _mobx.action)(function () {
            assignStateValue.call(this);

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return origin && origin.call.apply(origin, [this].concat(args));
          });
        }(target[updateKey]);
      }
    }

    return descriptor && (0, _extends3.default)({}, descriptor, { configurable: true });
  };
};