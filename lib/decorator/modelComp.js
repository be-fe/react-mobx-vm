'use strict';

exports.__esModule = true;
exports.symbol = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.isViewModelComponent = isViewModelComponent;
exports.default = modelComp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file: model-comp-v2.js
 * @author: Liang
 */
var symbol = exports.symbol = typeof Symbol === 'function' ? Symbol('model-comp') : '__model-comp__';

function isViewModelComponent(Comp) {
  return !!Comp[symbol];
}

function slice(props) {
  // eslint-disable-next-line no-unused-vars
  var local = props.local,
      rest = (0, _objectWithoutProperties3.default)(props, ['local']);

  return rest;
}

function modelComp(CompClass) {
  var _class, _temp;

  if (isViewModelComponent(CompClass)) {
    return CompClass;
  }

  var WrappedComp = (_temp = _class = function (_CompClass) {
    (0, _inherits3.default)(WrappedComp, _CompClass);

    function WrappedComp() {
      (0, _classCallCheck3.default)(this, WrappedComp);
      return (0, _possibleConstructorReturn3.default)(this, _CompClass.apply(this, arguments));
    }

    WrappedComp.prototype.componentDidMount = function componentDidMount() {
      if (this.props.local) {
        this.props.local.init && this.props.local.init(slice(this.props));
      }

      if (_CompClass.prototype.componentDidMount) {
        _CompClass.prototype.componentDidMount.apply(this, arguments);
      }
    };

    WrappedComp.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (nextProps.local !== this.props.local) {
        if (this.props.local.exit) {
          this.props.local.exit(slice(this.props));
        }
        if (nextProps.local.init) {
          nextProps.local.init(slice(nextProps));
        }
        if (_CompClass.prototype.componentWillReceiveProps) {
          _CompClass.prototype.componentWillReceiveProps.apply(this, arguments);
        }
        return;
      }

      if (this.props.local) {
        if (this.props.local.update) {
          this.props.local.update(slice(nextProps));
        } else if (this.props.local.init) {
          this.props.local.init(slice(nextProps));
        }
      }

      if (_CompClass.prototype.componentWillReceiveProps) {
        _CompClass.prototype.componentWillReceiveProps.apply(this, arguments);
      }
    };

    WrappedComp.prototype.componentWillUnmount = function componentWillUnmount() {
      this.props.local && this.props.local.exit && this.props.local.exit(slice(this.props));
      if (_CompClass.prototype.componentWillUnmount) {
        _CompClass.prototype.componentWillUnmount.apply(this, arguments);
      }
    };

    (0, _createClass3.default)(WrappedComp, [{
      key: 'local',
      get: function get() {
        return this.props.local;
      }
    }]);
    return WrappedComp;
  }(CompClass), _class[symbol] = true, _temp);


  return WrappedComp;
}