/**
 * @file stateLife
 * @author Cuttle Cong
 * @date 2018/2/4
 * @description
 */

import {
  extendObservable,
  action,
  autorun,
  isObservable,
  isObservableArray
} from 'mobx'

export const assignState = action(
  function (self, property, val) {
    const setVal = (value = val) => {
      if (self[property] !== value) {
        // console.log(name + ' set', property, value)
        self[property] = value
      }
    }

    if (typeof val !== 'undefined') {
      // console.log('before load url: `' + property + '`:', this[property]);
      if (val == null) {
        setVal()
      }
      else if (typeof self[property] === 'object' && self[property] !== null) {
        if (typeof val === 'object') {
          // remove overflow items if arrays
          if (
            Array.isArray(val) &&
            (isObservableArray(self[property]) || Array.isArray(self[property]))
            && val.length < self[property].length
          ) {
            self[property].splice(val.length, self[property].length - val.length)
          }
          for (let k in val) {
            if (val.hasOwnProperty(k)) {
              assignState(self[property], k, val[k])
            }
          }
        }
      }
      else if (typeof self[property] === 'number') {
        setVal(parseFloat(val))
      }
      else if (typeof self[property] === 'boolean') {
        setVal(typeof val === 'boolean' ? val : val === 'true')
      }
      else {
        setVal()
      }

      // console.log('after loaded url: `' + property + '`:', this[property]);
    }
  }
)

export default (config = {}, name = 'state-life') => {
  config = config || {}

  return (urlKey, options = {}, target, property, descriptor) => {
    if (typeof urlKey !== 'string') {
      options = urlKey
      urlKey = property
    }
    options = options || {}
    const { initKey = 'init', exitKey = 'exit', updateKey } = options
    const assignStateValue = function () {
      return assignState.call(null, this, property, config.get(urlKey))
    }

    if (typeof target[property] === 'function') {
      throw new Error('`' + name + '` can NOT use in member method')
    }
    else {

      let dispose
      let syncUrlTimer
      let syncUrlFn

      // eslint-disable-next-line no-inner-declarations
      function release() {
        dispose && dispose()
        dispose = null
        if (syncUrlTimer) {
          clearTimeout(syncUrlTimer)
          syncUrlFn && syncUrlFn()
          syncUrlTimer = void 0
          syncUrlFn = void 0
        }
      }

      let originExit = target[exitKey]
      target[exitKey] = function (...args) {
        config.exit && config.exit(this, property, urlKey)
        // console.log('dispose ' + name + ' `' + property + '`')
        release()
        return originExit && originExit.call(this, ...args)
      }

      // eslint-disable-next-line no-use-before-define
      target[initKey] = init(target[initKey], 'init')

      if (updateKey) {
        target[updateKey] = (
          function (origin) {
            return action(function (...args) {
              assignStateValue.call(this)
              return origin && origin.call(this, ...args)
            })
          }
        )(target[updateKey])
      }

      // eslint-disable-next-line no-inner-declarations,no-unused-vars
      function init(origin, actionType) {
        return action(function (...args) {
          config.init && config.init(this, property, urlKey)

          // console.log(actionType + ' ' + name + ' `' + property + '`')
          release()

          if (!isObservable(this, property)) {
            console.warn('`' + property + '` is not observable, `' + name + '` setting it to be observable')
            extendObservable(this, {
              [property]: this[property]
            })
          }

          assignStateValue.call(this)

          let isFirst = true
          dispose = autorun(
            () => {
              // 一段时间内的修改以最后一次为准
              if (syncUrlTimer) {
                clearTimeout(syncUrlTimer)
                syncUrlTimer = void 0
              }

              let obj = { [urlKey]: this[property] }
              // invoke the deep `getter` of this[property]
              // noop op
              try {
                JSON.stringify(obj)
              } catch (err) {
                console.error('[Stringify]', obj, 'Error happened:', err)
              }

              syncUrlFn = (isFirst = false) => {
                let save = isFirst ? (
                  config.saveFirstTime || config.save
                ) : config.save
                save.call(config, urlKey, this[property], config.fetch())
                syncUrlTimer = void 0
                syncUrlFn = void 0
              }

              if (isFirst) {
                if (options.initialWrite) {
                  syncUrlFn(true)
                }
                isFirst = false
                return
              }

              syncUrlTimer = setTimeout(syncUrlFn, 250)
            }
          )

          return origin && origin.call(this, ...args)
        })
      }
    }

    return descriptor && { ...descriptor, configurable: true }
  }
}
