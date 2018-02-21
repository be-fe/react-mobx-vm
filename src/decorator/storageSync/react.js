/**
 * @file index
 * @author Cuttle Cong
 * @date 2017/11/6
 * @description
 */

import sync from './core'
import { invokedWithArgs } from '../utils'

const keyMap = {
  initKey: 'componentDidMount',
  updateKey: 'componentWillReceiveProps',
  exitKey: 'componentWillUnmount'
}

/**
 * View 层的数据（localStorage）存储同步
 * @public
 * @name reactStorageSync
 * @param [storageKey=property] {string}
 * @param options {string} 参考{@link #reacturlsync|reactUrlSync}
 */
export default function (urlKeyOrTarget, property, descriptor) {
  if (invokedWithArgs(arguments)) {
    let options = property
    return (target, property, descriptor) =>
      sync(urlKeyOrTarget || property, { ...keyMap, ...options }, target, property, descriptor)
  }

  return sync(property, keyMap, urlKeyOrTarget, property, descriptor)
}
