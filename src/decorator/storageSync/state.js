/**
 * @file index
 * @author Cuttle Cong
 * @date 2017/11/6
 * @description
 */

import sync from './core'
import { invokedWithArgs } from '../utils'

const keyMap = {
  initKey: 'init',
  updateKey: 'update',
  exitKey: 'exit'
}

/**
 * Model层的数据（localStorage）存储同步
 * @public
 * @name storageSync
 * @param [storageKey=property] {string}
 * @param options {string} 参考{@link #reacturlsync|reactUrlSync}
 * @example
 * class Model extends Root {
 *    \@storageSync
 *    \@observable data = { arr: [1, 2, 3] }
 * }
 * // 在修改了 `model.data` 之后，查看 `localStorage` 中的数据
 */
export default function (urlKeyOrTarget, property, descriptor) {
  if (invokedWithArgs(arguments)) {
    let options = property
    return (target, property, descriptor) =>
      sync(urlKeyOrTarget || property, { ...keyMap, ...options }, target, property, descriptor)
  }

  return sync(property, keyMap, urlKeyOrTarget, property, descriptor)
}
