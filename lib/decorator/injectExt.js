'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = injectExt;

var _injectInverseInherit = require('./injectInverseInherit');

var _injectInverseInherit2 = _interopRequireDefault(_injectInverseInherit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function injectExt(name, action) {
  if (typeof name === 'function') {
    action = name;
    name = 'app';
  }
  return function (Comp) {
    var _dec, _class;

    var InjectExt = (_dec = (0, _injectInverseInherit2.default)(name), _dec(_class = function (_Comp) {
      (0, _inherits3.default)(InjectExt, _Comp);

      function InjectExt() {
        (0, _classCallCheck3.default)(this, InjectExt);

        for (var _len = arguments.length, p = Array(_len), _key = 0; _key < _len; _key++) {
          p[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, _Comp.call.apply(_Comp, [this].concat(p)));

        action && action.call(_this, _this.store[name]);
        return _this;
      }

      return InjectExt;
    }(Comp)) || _class);


    return InjectExt;
  };
} /**
   * @file: injectExt
   * @author: Cuttle Cong
   * @date: 2018/1/28
   * @description:
   */