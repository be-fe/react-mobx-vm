/**
 * @file jsdoc
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var doc = require('doctrine')

var ast = doc.parse(
  `
/**
 * @file index
 * @author Cuttle Cong
 * @date 2017/11/6
 * @description
 */

import urlsync from './core'
import { invokedWithArgs } from '../utils'

const keyMap = {
  initKey: 'init',
  // updateKey: 'update',
  exitKey: 'exit'
}

/**
 * @example
 *  class Model extends Root {
 *      \\@urlSync
 *      \\@observable sync = 'abc'
 *  }
 * @public
 */
function urlSync(urlKeyOrTarget, property, descriptor) {
  if (invokedWithArgs(arguments)) {
    let options = property
    return (target, property, descriptor) =>
      urlsync(urlKeyOrTarget || property, { ...keyMap, ...options }, target, property, descriptor)
  }

  return urlsync(property, keyMap, urlKeyOrTarget, property, descriptor)
}

export default urlSync

  `, { unwrap: true }
)

console.log(ast)
