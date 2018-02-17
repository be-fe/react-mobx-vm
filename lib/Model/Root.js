'use strict';

exports.__esModule = true;
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _every2 = require('lodash/every');

var _every3 = _interopRequireDefault(_every2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _desc, _value, _class; /**
                            * @file   Root
                            * @author yucong02
                            */

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Root = (_class = function () {
  Root.prototype.init = function init() {};

  Root.prototype.update = function update() {};

  Root.prototype.exit = function exit() {};

  Root.prototype.toJSON = function toJSON() {
    return (0, _mobx.toJS)(this);
  };

  Root.prototype.setValue = function setValue(key, value) {
    (0, _set3.default)(this, key, value);
    return this;
  };

  function Root() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Root);

    this.assignShallow(init);
  }

  Root.prototype.assignShallow = function assignShallow(data) {
    data = (0, _mobx.toJS)(data);
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = typeof data[key] === 'undefined' ? this[key] : data[key];
      }
    }
    return this;
  };

  Root.prototype.clone = function clone() {
    return new this.constructor(this);
  };

  Root.prototype.isEqual = function isEqual(other) {
    return this === other || (0, _isEqual3.default)(this.toJSON(), other instanceof Root ? other.toJSON() : other);
  };

  Root.prototype.assign = function assign(data) {
    return this.assignShallow(data);
  };

  Root.prototype.assignDeep = function assignDeep(data) {
    data = (0, _cloneDeep3.default)((0, _mobx.toJS)(data, false));
    return this.assignShallow(data);
  };

  Root.prototype.isEmpty = function isEmpty() {
    return (0, _every3.default)(this, function (value) {
      if (value instanceof Root) {
        return value.isEmpty();
      }
      return (0, _isEmpty3.default)(value);
    });
  };

  return Root;
}(), (_applyDecoratedDescriptor(_class.prototype, 'setValue', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'assignShallow', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'assignShallow'), _class.prototype)), _class);
exports.default = Root;