"use strict";

exports.__esModule = true;
exports.default = get;
/**
 * @file: increaseId
 * @author: Cuttle Cong
 * @date: 2018/2/13
 * @description:
 */

var id = 1;

function get() {
  return id++;
}