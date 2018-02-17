'use strict';

exports.__esModule = true;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _getStateLifeDecorator = require('../utils/getStateLifeDecorator');

var _getStateLifeDecorator2 = _interopRequireDefault(_getStateLifeDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyName = '--[storage-sync]--'; /* eslint-disable */
/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */

exports.default = (0, _getStateLifeDecorator2.default)({
    save: function save(key, value, state) {
        var _extends2;

        localStorage.setItem(keyName, JSON.stringify((0, _extends4.default)({}, state, (_extends2 = {}, _extends2[key] = value, _extends2))));
    },
    fetch: function fetch() {
        var str = localStorage.getItem(keyName);
        try {
            return JSON.parse(str) || {};
        } catch (ex) {
            return {};
        }
    },
    get: function get(key) {
        return this.fetch()[key];
    }
}, 'storage-sync');