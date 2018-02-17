/* eslint-disable */
/**
 * @file   autorun
 * @author yucong02
 */
import {
  autorun
} from 'mobx'
import logger from '../../utils/logger'

export default (opt = {}, target, property, description) => {
  const { initKey = 'init', exitKey = 'exit' } = opt
  if (typeof target[property] === 'function') {
    let dispose

    function release() {
      // logger.debug('dispose autorun `' + property + '`')
      dispose && dispose()
      dispose = null
    }

    function wrapMethod(method, callback) {
      return function () {
        // autorun 在 urlsync 后面执行
        const rlt = method && method.apply(this, arguments)
        callback && callback.call(this)
        return rlt
      }
    }


    target[exitKey] = wrapMethod(target[exitKey], function () {
      release()
    })

    target[initKey] = wrapMethod(target[initKey], function () {
      if (dispose) {
        return
      }
      // logger.debug('load autorun `' + property + '`')
      dispose = autorun(() => {
        target[property].call(this, dispose)
      })
    })

  }
  else {
    throw new Error('`autorun` should be used in member method')
  }

  return description && { ...description, configurable: true }
}
