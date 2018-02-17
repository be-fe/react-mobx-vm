'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = function (StateClass) {
  var keyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'local';
  var initData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return function (componentClass) {
    if (typeof initData === 'function') {
      initData = initData();
    }
    return function (_componentClass) {
      (0, _inherits3.default)(SIO, _componentClass);

      // [refAPI]
      SIO.prototype.getState = function getState() {
        return this[keyName];
      };

      // [refAPI]


      SIO.prototype.getStateJSON = function getStateJSON() {
        return (0, _mobx.toJS)(this[keyName]);
      };

      function SIO(p) {
        var _this, _ret;

        (0, _classCallCheck3.default)(this, SIO);

        var out = (_this = (0, _possibleConstructorReturn3.default)(this, _componentClass.call(this, p)), _this);
        _this[keyName] = typeof StateClass !== 'function' ? StateClass : new StateClass(initData);

        return _ret = out, (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      // WillMount 修改为 DidMount
      // 因为上一个 componentWillUnmount
      //  发生晚于 componentWillMount
      //      会出现先 注册 urlsync (componentWillMount)
      //      然后会立即注销 urlsync (componentWillUnmount)


      SIO.prototype.componentDidMount = function componentDidMount() {
        this[keyName].init && this[keyName].init(this.props);
        if (_componentClass.prototype.componentDidMount) {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _componentClass.prototype.componentDidMount.apply(this, args);
        }
      };

      SIO.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (this[keyName].update) {
          this[keyName].update(args[0]);
        } else if (this[keyName].init) {
          this[keyName].init(args[0]);
        }
        if (_componentClass.prototype.componentWillReceiveProps) {
          _componentClass.prototype.componentWillReceiveProps.apply(this, args);
        }
      };

      SIO.prototype.componentWillUnmount = function componentWillUnmount() {
        this[keyName].exit && this[keyName].exit(this.props);
        if (_componentClass.prototype.componentWillUnmount) {
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _componentClass.prototype.componentWillUnmount.apply(this, args);
        }
      };

      return SIO;
    }(componentClass);
  };
};

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }