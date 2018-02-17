'use strict';

exports.__esModule = true;
exports.fetch = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * @file: collect
 * @author: Cuttle Cong
 * @date: 2018/1/28
 * @description:
 */
var fetch = exports.fetch = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof source === 'function')) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return source();

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
            return _context.abrupt('return', source);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = function () {
  for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
    paths[_key] = arguments[_key];
  }

  if (!Array.isArray(arguments[0]) && arguments[0] && ((0, _typeof3.default)(arguments[0]) === 'object' || typeof arguments[0] === 'function')) {
    return fetch(arguments[0]);
  }

  return function collect(Comp) {
    (0, _reactUtils.assertReactClass)(Comp, 'collect');
    if (paths.length === 0) {
      return Comp;
    }

    var Collect = function (_Comp) {
      (0, _inherits3.default)(Collect, _Comp);

      function Collect() {
        (0, _classCallCheck3.default)(this, Collect);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, _Comp.call.apply(_Comp, [this].concat(args)));

        Promise.all(paths.map(function (path) {
          return fetch((0, _get2.default)(_this.store.app, path)).then(function (data) {
            (0, _set2.default)(_this.store.app, path, data);
          });
        })).then(function () {
          _this[symbol] = 'resolved';
          _this.forceUpdate();
        });
        return _this;
      }

      Collect.prototype.render = function render() {
        if (this[symbol] !== 'resolved') {
          return null;
        }
        return _Comp.prototype.render.call(this);
      };

      return Collect;
    }(Comp);

    return (0, _injectInverseInherit2.default)()(Collect);
  };
};

var _injectInverseInherit = require('./injectInverseInherit');

var _injectInverseInherit2 = _interopRequireDefault(_injectInverseInherit);

var _reactUtils = require('../utils/reactUtils');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbol = typeof Symbol === 'function' ? Symbol('collect') : '--[[collect]]--';