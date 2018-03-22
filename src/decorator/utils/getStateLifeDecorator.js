/**
 * @file stateLife
 * @author Cuttle Cong
 * @date 2018/2/4
 * @description
 */

import {
  action,
  autorun,
  observable,
  isObservableArray,
  toJS
} from 'mobx'
import logger from '../../utils/logger'

export const assignState = action(
  function (self, property, val) {
    const setVal = (value = val) => {
      if (self[property] !== value) {
        logger.debug(name + ' set', property, value)
        self[property] = value
      }
    }

    if (typeof val !== 'undefined') {
      logger.debug('before load `' + property + '`:', self[property])
      if (val == null) {
        setVal()
      }
      else if (typeof self[property] === 'object' && self[property] !== null) {
        if (typeof val === 'object') {
          // remove overflow items if arrays
          if (
            Array.isArray(val) &&
            (
              isObservableArray(self[property]) || Array.isArray(self[property])
            )
            && val.length < self[property].length
          ) {
            self[property].splice(val.length, self[property].length - val.length)
          }
          if (Array.isArray(val)) {
            val.forEach((v, k) => assignState(self[property], k, v))
          }
          else {
            for (let k in val) {
              if (val.hasOwnProperty(k)) {
                assignState(self[property], k, val[k])
              }
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

      logger.debug('after load: `' + property + '`:', self[property])
    }
  }
)

// const g = {}
function setHideProps(target, propKey, value) {
  Object.defineProperty(target, propKey, {
    value,
    configurable: true,
    enumerable: false
  })
}

export default (config = {}, name = 'state-life') => {
  config = config || {}
  // const collection = g[name] = g[name] || {}

  return (urlKey, options = {}, target, property, descriptor) => {
    if (typeof urlKey !== 'string') {
      options = urlKey
      urlKey = property
    }
    options = options || {}
    const { initKey = 'init', exitKey = 'exit', updateKey } = options
    const assignStateValue = function (self, property, urlKey) {
      return assignState(self, property, config.get(urlKey))
    }

    if ('value' in descriptor && typeof descriptor.value === 'function') {
      throw new Error('`' + name + '` can NOT use in member method')
    }

    if ('initializer' in descriptor) {
      logger.warn('`' + property + '`' + 'is unobservable,', name, 'would make it to be observable.')
      descriptor = observable(target, property, descriptor)
    }
    const hideArrPropKey = `__[[${name}_hooks]]__`

    // NOTE:
    // class P {
    //    @urlSync s = 'a'
    // }
    // class S extends P {
    //    @urlSync s = 'a'
    // }
    // new S() --> should run the S.s hooks, ignore P hooks
    // Firstly!
    if (!target[hideArrPropKey]) {
      setHideProps(target, hideArrPropKey, [])
    }
    // inheritance
    else if (!target.hasOwnProperty(hideArrPropKey)) {
      // set to Prototype
      setHideProps(target, hideArrPropKey, target[hideArrPropKey].slice())
    }
    let i = target[hideArrPropKey].findIndex(([p]) => p === property)
    if (i >= 0) {
      target[hideArrPropKey].splice(i, 1)
    }
    const func = (
      function (options, urlKey, property) {
        let dispose
        let syncUrlTimer
        let syncUrlFn
        function runLazyNow() {
          if (syncUrlTimer) {
            clearTimeout(syncUrlTimer)
            syncUrlFn && syncUrlFn()
            syncUrlTimer = void 0
            syncUrlFn = void 0
          }
        }

        // eslint-disable-next-line no-inner-declarations
        function release() {
          dispose && dispose()
          dispose = null
          runLazyNow()
        }

        return {
          init: function () {
            config.init && config.init(this, property, urlKey)
            logger.debug('init ' + name + ' `' + property + '`')
            release()
            assignStateValue(this, property, urlKey)

            let isFirst = true
            dispose = autorun(() => {
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
                // toJS for fix ObservableArray can't be stringify
                save.call(config, urlKey, toJS(this[property]), config.fetch())
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
            })
          },
          update: function () {
            // The vm's model has the below link rule (two vm instances)
            // x -> y
            // a -> b -> c

            // It's time that trigger `x` syncUrlTimer would cause the url updated
            // Then trigger update hook like above link rule
            // So we need run `runLazyNow` in update hook
            runLazyNow()
            assignStateValue(this, property, urlKey)
          },
          exit: function () {
            config.exit && config.exit(this, property, urlKey)
            logger.debug('dispose ' + name + ' `' + property + '`')
            release()
          }
        }
      }
    )(options, urlKey, property)
    // const arrays =
    target[hideArrPropKey].push([property, urlKey, func])

    const hooks = {
      init: target[initKey],
      update: target[updateKey],
      exit: target[exitKey]
    }
    const callHook = (self, hookName, args) => {
      return typeof hooks[hookName] === 'function'
             && hooks[hookName].apply(self, args)
    }

    target[initKey] = function (...args) {
      this[hideArrPropKey].forEach(([, , { init }]) => {
        init.call(this)
      })
      return callHook(this, initKey, args)
    }
    if (updateKey) {
      target[updateKey] = function (...args) {
        this[hideArrPropKey].forEach(([, , { update }]) => {
          update.call(this)
        })
        return callHook(this, updateKey, args)
      }
    }
    target[exitKey] = function (...args) {
      // @todo setTimeout move to all for better performance.
      this[hideArrPropKey].forEach(([, , { init }]) => {
        init.call(this)
      })
      return callHook(this, exitKey, args)
    }

    return descriptor && { ...descriptor, configurable: true }
  }
}
