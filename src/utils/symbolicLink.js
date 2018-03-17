/**
 * @file sync
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import { defineDeepProperties } from './define'
import _ from 'lodash'
import nearestRefPath from './nearestRefPath'
import { Symbolic } from '../Model/SymbolicLink'

// const symbolicKey = typeof Symbol === 'function' ? Symbol('__symbolic__') : '__[symbolic]__'
/**
 * 用于建立 target 与外接的连接，类似于[Symbolic Link](https://en.wikipedia.org/wiki/Symbolic_link).
 * @see [SymbolicLink](./others.md#symboliclink)
 * @example
 *  let host = { a: 'a' }
 *  const proxy = { a: 'x' }
 *  host = symbolic(host, {
 *    'a': Symbolic(proxy, 'a')
 *  })
 *  host.a === 'x'
 * @name symbolicLink
 * @public
 * @param target
 * @param config
 */
export default function symbolicLink(target, config = {}) {
  const properties = {}
  _.each(config, (symbol, keyName) => {
    if (!(symbol instanceof Symbolic)) {
      throw new TypeError('symbolic requires the instanceof Symbolic(Custom).')
    }
    const value = symbol.rule
    // SymbolicCustom
    if (value && !Array.isArray(value) && typeof value === 'object') {
      properties[keyName] = value
      return
    }

    let ref = value[0]
    let paths = value[1]

    // Deep observable ref can't access now.
    // Would trigger lazy initializer about mobx.
    // Some amazing error would be thrown
    // let { ref: nearestRef, path } = nearestRefPath(ref, paths)

    // if (process.env.NODE_ENV !== 'production' && !isObservable(nearestRef, path)) {
    //   console.warn('[Warning]: the symbolic origin ref is unobservable.', 'ref:', nearestRef, ' path:', path)
    // }
    // if (typeof nearestRef === 'undefined') {
    //   throw new Error('symbolicLink requires nearestRef')
    // }
    properties[keyName] = {
      get() {
        let { ref: nearestRef, path } = nearestRefPath(ref, paths)
        return nearestRef[path]
      },
      set(val) {
        let { ref: nearestRef, path } = nearestRefPath(ref, paths)
        nearestRef[path] = val
      }
    }
  })


  // hack mobx @observable
  if (target.__mobxLazyInitializers && target.__mobxLazyInitializers.push) {
    target.__mobxLazyInitializers.push(function symbolicLinkDefine(instance) {
      defineDeepProperties(instance, properties)
    })
  }

  return defineDeepProperties(target, properties)
}
