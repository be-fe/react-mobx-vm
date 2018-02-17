/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */

import urlsync from './core'
import { invokedWithArgs } from '../utils'

const keyMap = {
  initKey: 'init',
  // updateKey: 'update',
  exitKey: 'exit'
}

/**
 * @def: .urlsyncDecorator: withArgs | withoutArg
 *  withArgs: string => decorator
 *      decorator: target, property, descriptor => descriptor
 *  withoutArg: decorator
 *  example:
 *      @urlsync(null, )
 */

export default function (urlKeyOrTarget, property, descriptor) {
  if (invokedWithArgs(arguments)) {
    let options = property
    return (target, property, descriptor) =>
      urlsync(urlKeyOrTarget || property, { ...keyMap, ...options }, target, property, descriptor)
  }

  return urlsync(property, keyMap, urlKeyOrTarget, property, descriptor)
}
