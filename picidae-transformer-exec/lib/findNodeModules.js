/**
 * @file findNodeModules
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var parentDir = require('find-parent-dir')

module.exports = function (path) {
  path = path || process.cwd()

  return parentDir.sync(path, 'node_modules')
}
