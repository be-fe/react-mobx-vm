'use strict';

exports.__esModule = true;
/**
 * @file: debugLogger
 * @author: Cuttle Cong
 * @date: 2018/2/15
 * @description:
 */
// import { debuglog } from 'util'

exports.default = {
  debug: function debug() {
    if (process.env.NODE_ENV !== 'production') {
      var _console;

      (_console = console).log.apply(_console, arguments);
    }
  },
  warn: function warn() {
    if (process.env.NODE_ENV !== 'production') {
      var _console2;

      (_console2 = console).warn.apply(_console2, arguments);
    }
  },
  error: function error() {
    if (process.env.NODE_ENV !== 'production') {
      var _console3;

      (_console3 = console).error.apply(_console3, arguments);
    }
  }
};