/**
 * @file defineProperties
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */

import * as _ from 'lodash'
import nearestRefPath from './nearestRefPath'

export function defineProperties(
  target: any,
  properties: PropertyDescriptorMap = {}
): any {
  const setting = {}
  _.each(properties, function(val, key) {
    setting[key] = {
      configurable: true,
      enumerable: true,
      ...val
    }
  })

  return Object.defineProperties(target, setting)
}

export function defineDeepProperties(
  target: any,
  properties: PropertyDescriptorMap = {}
): any {
  _.each(properties, function(val, key) {
    const { ref, path } = nearestRefPath(target, key)
    if (!ref) {
      throw new Error('defineDeepProperties: ref is null.')
    }
    Object.defineProperty(ref, path, {
      configurable: true,
      enumerable: true,
      ...val
    })
  })

  return target
}
