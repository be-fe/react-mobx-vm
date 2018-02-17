'use strict';

exports.__esModule = true;

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

exports.register = register;

var _mobx = require('mobx');

var _getStateLifeDecorator = require('../utils/getStateLifeDecorator');

var _getStateLifeDecorator2 = _interopRequireDefault(_getStateLifeDecorator);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import globalContext from '../../utils/globalContext'


var useHistory = void 0,
    unlisten = void 0,
    collection = {}; /* eslint-disable */
/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */
function register(history) {
  useHistory = history;
}

function assertHistory() {
  if (!useHistory) {
    console.error('Error: You DO NOT \`register(history)\` before using urlSync. ' + 'NOTE: \`history\` should be from \'history\' or \'react-router\'');
    throw new Error('NOT `register(history)`');
  }
}

function checkExistedName(name) {
  var f = collection[name];
  if (f) {
    _logger2.default.error('Warning: "' + name + '" has already been used in urlSync before. Please rename it: `@urlSync(\'rename\')`');
  }
}

exports.default = (0, _getStateLifeDecorator2.default)({
  init: function init(self, property, name) {
    assertHistory();
    checkExistedName(name);
    collection[name] = _getStateLifeDecorator.assignState.bind(null, self, property);
    if (unlisten) {
      // unListen previous listener
      return;
    }
    unlisten = useHistory.listen((0, _mobx.action)(function (location) {
      if (location.action === 'POP') {
        Object.keys(collection).forEach(function (name) {
          var assign = collection[name];
          if (name in location.query) {
            assign(location.query[name]);
          }
        });
      }
    }));
  },
  exit: function exit(self, property, name) {
    delete collection[name];
  },
  saveFirstTime: function saveFirstTime(key, value, data) {
    var _extends2;

    assertHistory();
    useHistory.replace((0, _extends5.default)({}, data, {
      query: (0, _extends5.default)({}, data.query, (_extends2 = {}, _extends2[key] = value, _extends2))
    }));
  },
  save: function save(key, value, data) {
    var _extends3;

    assertHistory();
    useHistory.push((0, _extends5.default)({}, data, {
      query: (0, _extends5.default)({}, data.query, (_extends3 = {}, _extends3[key] = value, _extends3))
    }));
  },
  fetch: function fetch() {
    assertHistory();
    return useHistory.getCurrentLocation();
  },
  get: function get(key) {
    assertHistory();
    return this.fetch().query[key];
  }
}, 'urlsync');