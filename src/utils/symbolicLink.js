/**
 * @file sync
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import { defineDeepProperties } from './define'
import _ from 'lodash'
import nearestRefPath from './nearestRefPath'
import { isObservable } from 'mobx'


// const symbolicKey = typeof Symbol === 'function' ? Symbol('__symbolic__') : '__[symbolic]__'
/**
 * 用于建立 target 与外接的连接，类似于[Symbolic Link](https://en.wikipedia.org/wiki/Symbolic_link).
 * @example
 *  let host = { a: 'a' }
 *  const proxy = { a: 'x' }
 *  host = symbolic(host, {
 *    'a': [proxy, 'a']
 *  })
 *  host.a === 'x'
 * @name symbolic
 * @public
 * @param target
 * @param config
 */
export default function symbolic(target, config = {}) {
  const properties = {}
  _.each(config, (value, keyName) => {
    // SymbolicCustom
    if (value && !Array.isArray(value) && typeof value === 'object') {
      properties[keyName] = value
      return
    }

    let ref = value[0]
    let paths = value[1]
    let { ref: nearestRef, path } = nearestRefPath(ref, paths)

    if (process.env.NODE_ENV !== 'production' && !isObservable(nearestRef, path)) {
      console.warn('[Warning]: the symbolic origin ref is unobservable.', 'ref:', nearestRef, ' path:', path)
    }
    if (typeof nearestRef === 'undefined') {
      throw new Error('symbolicLink requires nearestRef')
    }
    properties[keyName] = {
      get() {
        return nearestRef[path]
      },
      set(val) {
        nearestRef[path] = val
      }
    }
  })


  // hack mobx @observable
  if (target.__mobxLazyInitializers && target.__mobxLazyInitializers.push) {
    target.__mobxLazyInitializers.push(function (instance) {
      defineDeepProperties(instance, properties)
    })
  }

  return defineDeepProperties(target, properties)
}
