'use strict';

exports.__esModule = true;
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Root2 = require('./Root');

var _Root3 = _interopRequireDefault(_Root2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Piped = function (_Root) {
  (0, _inherits3.default)(Piped, _Root);

  function Piped() {
    (0, _classCallCheck3.default)(this, Piped);
    return (0, _possibleConstructorReturn3.default)(this, _Root.apply(this, arguments));
  }

  Piped.prototype.init = function init(_init) {
    this.assignShallow(_init);
  };

  Piped.prototype.update = function update(init) {
    this.assignShallow(init);
  };

  return Piped;
}(_Root3.default); /**
                    * @file: Piped
                    * @author: Cuttle Cong
                    * @date: 2018/1/29
                    * @description:
                    */


exports.default = Piped;