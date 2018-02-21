/**
 * @file index
 * @author Cuttle Cong
 * @date 2017/11/6
 * @description
 */

import urlsync from './core'
import { invokedWithArgs } from '../utils'

const keyMap = {
  initKey: 'componentDidMount',
  // updateKey: 'componentWillReceiveProps',
  exitKey: 'componentWillUnmount'
}

/**
 * 用于同步状态至 URL，不同于 [`urlSync`](#urlsync) 的地方是，`reactUrlSync` 用于 react 视图层
 * @namespace urlSync
 * @name reactUrlSync
 * @param [urlKey=property] {string} - 状态对应URL上的 key
 * @param [options] {Object} - 选项
 * @param [options.initialWrite=false] {boolean}  
 *  是否在第一次加载时候，将状态值写至 URL
 * @example
 *  class View extends React.Component {
 *      \@reactUrlSync
 *      \@observable sync = 'abc'
 *  }
 * @public
 */
export default function (urlKeyOrTarget, property, descriptor) {
  if (invokedWithArgs(arguments)) {
    let options = property
    return (target, property, descriptor) =>
      urlsync(urlKeyOrTarget || property, { ...keyMap, ...options }, target, property, descriptor)
  }

  return urlsync(property, keyMap, urlKeyOrTarget, property, descriptor)
}
