'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = function () {
  for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
    props[_key] = arguments[_key];
  }

  if (!props.length) {
    props = ['app'];
  }
  var contextTypes = {};
  props.forEach(function (prop) {
    contextTypes[prop] = _propTypes2.default.any;
  });

  return function (Comp) {
    var _class, _temp;

    return _temp = _class = function (_Comp) {
      (0, _inherits3.default)(injectInverseInherit, _Comp);
      (0, _createClass3.default)(injectInverseInherit, [{
        key: 'store',
        get: function get() {
          return this.context.mobxStores;
        }
      }]);

      function injectInverseInherit() {
        (0, _classCallCheck3.default)(this, injectInverseInherit);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, _Comp.call.apply(_Comp, [this].concat(args)));

        if (_this.store.app) {
          Object.defineProperty(_this, 'app', {
            get: function get() {
              return this.store.app;
            },
            configurable: true
          });
        }
        return _this;
      }

      return injectInverseInherit;
    }(Comp), _class.contextTypes = (0, _extends3.default)({}, Comp.contextTypes, {
      mobxStores: _propTypes2.default.any
    }), _temp;
  };
};

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }