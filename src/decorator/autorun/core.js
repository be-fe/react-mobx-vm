/* eslint-disable */
/**
 * @file   autorun
 * @author yucong02
 */
import {
  observable,
  action,
  computed,
  reaction,
  runInAction,
  autorun
} from 'mobx'

export default (opt = {}, target, property, description) => {
  const { initKey = 'init', exitKey = 'exit' } = opt
  if (typeof target[property] === 'function') {
    let dispose

    function release() {
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
      console.log('dispose autorun `' + property + '`')
      release()
    })

    target[initKey] = wrapMethod(target[initKey], function () {
      if (dispose) {
        return
      }
      console.log('load autorun `' + property + '`')
      dispose = autorun(() => {
        target[property].call(this, dispose)
      })
    })

  } else {
    throw new Error('`autorun` 请使用在成员方法中')
  }

  return description && { ...description, configurable: true }
}
