'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getView = getView;
exports.default = bindView;

var _modelComp = require('./modelComp');

var _modelComp2 = _interopRequireDefault(_modelComp);

var _mobxReact = require('mobx-react');

var _increaseId = require('../utils/increaseId');

var _increaseId2 = _interopRequireDefault(_increaseId);

var _reactUtils = require('../utils/reactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file: bindView
 * @author: Cuttle Cong
 * @date: 2018/1/27
 * @description:
 */
function getView(Model) {
  if (typeof Model === 'function') {
    return Model.prototype.defaultComp;
  }
  return Model && Model.defaultComp;
}

function bindView(View) {
  if (typeof View !== 'function') {
    throw new TypeError('bindView require View is function, but ' + (typeof View === 'undefined' ? 'undefined' : (0, _typeof3.default)(View)));
  }
  // observer convert to react Class from function
  View = (0, _mobxReact.observer)(View);
  View = (0, _modelComp2.default)(View);

  return function (State) {
    Object.defineProperty(State.prototype, 'defaultComp', {
      value: View,
      enumerable: false,
      configurable: true
    });

    Object.defineProperty(State.prototype, 'viewId', {
      value: (0, _increaseId2.default)(),
      enumerable: false,
      configurable: true
    });
    return State;
  };
}