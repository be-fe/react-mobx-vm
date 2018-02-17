/**
 * @file   reaction
 * @author yucong02
 */
import {
  action,
  reaction
} from 'mobx'
import logger from '../../utils/logger'
import { get, hasIn } from 'lodash'

export default ({ init = 'init', exit = 'exit' }, ...keyNames) => {
  if (!keyNames.length) {
    throw new Error('`reaction` should pass some refPaths')
  }

  const exited = {}
  keyNames = keyNames.filter(x => {
    if (exited[x]) {
      return false
    }
    exited[x] = true
    return true
  })

  return (target, property, descriptor) => {
    if (typeof target[property] !== 'function') {
      throw new Error('`reaction` should used in member method')
    }

    let dispose
    let originInit = target[init]
    target[init] = action(function () {
      // logger.debug(`reaction initialized : ${property}`)
      // 置前的原因请参考 autorun 置前的原因
      const rlt = originInit && originInit.apply(this, arguments)

      dispose = reaction(
        () => keyNames.map(refPath => {
          if (!hasIn(this, refPath)) {
            throw new Error(`The reference path: ${refPath} is not found.`)
          }
          return get(this, refPath)
        }),
        args => target[property].apply(this, args.concat(dispose))
      )
      return rlt
    })


    let originExit = target[exit]
    target[exit] = function () {
      // logger.debug(`dispose reaction : ${property}`)
      dispose && dispose()
      return originExit && originExit.apply(this, arguments)
    }

    return descriptor && { ...descriptor, configurable: true }
  }
}


