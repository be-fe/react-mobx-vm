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
 * 用于同步状态至 URL
 * @namespace urlSync
 * @name urlSync
 * @example
 * class Model extends Root {
 *   \@urlSync
 *   \@observable sync = 'abc'
 *   // 未使用 @observable 修饰, urlSync会自动将其转为 observable
 *   \@urlSync('g')
 *   value = 'abcdef'
 * }
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
