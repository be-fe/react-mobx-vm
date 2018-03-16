/**
 * @file defineProperties
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */

import _ from 'lodash'
import nearestRefPath from './nearestRefPath'

export function defineProperties(target, properites = {}) {
  const setting = {}
  _.each(properites, function (val, key) {
    setting[key] = {
      configurable: true,
      enumerable: true,
      ...val
    }
  })

  return Object.defineProperties(target, setting)
}

export function defineDeepProperties(target, properites = {}) {
  _.each(properites, function (val, key) {
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
