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
      sync(urlKeyOrTarget || property, { ...keyMap, ...options }, target, property, descriptor)
  }

  return sync(property, keyMap, urlKeyOrTarget, property, descriptor)
}
