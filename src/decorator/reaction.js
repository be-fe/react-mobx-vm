/**
 * @file   reaction
 * @author yucong02
 */
import {
  observable,
  action,
  computed,
  reaction
} from 'mobx'
import {
  invokedWithArgs,
  newError,

  log,
  warn
} from './utils'


/**
 *
 * @deprecated
 * @def: .reactionDecorator: (target, property, descriptor) => descriptor throws invokeError | typeError
 *  invokeError: Error
 *      type: 'decorator-wrong-invocation'
 *
 *  typeError: Error
 *      type: 'decorator-wrong-property-type'
 */
export default (...keyNames) => {
  if (!invokedWithArgs(keyNames)) {
    throw newError('decorator-wrong-invocation', '`reaction` 请绑定被监听的属性值')
  }

  const exited = {}
  keyNames = keyNames.filter(x => {
    if (exited[x]) {
      return false
    } else {
      exited[x] = true
      return true
    }
  })

  return (target, property, descriptor) => {
    if (typeof target[property] !== 'function') {
      throw newError('decorator-wrong-property-type', '`reaction` 只能用于成员方法')
    }

    let dispose
    let originInit = target.init

    target.init = action(function () {
      log(`reaction inited : ${property}`)
      // 置前的原因请参考 autorun 置前的原因
      const rlt = originInit && originInit.apply(this, arguments)

      dispose = reaction(
        () => {
          return keyNames.reduce((obj, name) => {
            const arr = name.split('.')
            const val = arr.reduce((obj, b) => {
              return obj[b]
            }, this)

            obj[arr.join('_')] = val
            return obj
          }, {})
        },
        data => target[property].call(this, data, dispose)
      )
      return rlt
    })


    let originExit = target.exit
    target.exit = function () {
      log(`dispose reaction : ${property}`)
      dispose && dispose()
      return originExit && originExit.apply(this, arguments)
    }

    return descriptor && { ...descriptor, configurable: true }
  }
}


