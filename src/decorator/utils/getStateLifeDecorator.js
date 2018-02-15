/**
 * @file: stateLife
 * @author: Cuttle Cong
 * @date: 2018/2/4
 * @description:
 */

import {
  extendObservable,
  action,
  autorun,
  isObservable
} from 'mobx'


export default (config = {}, name = 'state-life') => {
  config = config || {}

  return (urlKey, options = {}, target, property, descriptor) => {
    options = options || {}
    const { initKey = 'init', loose = false, exitKey = 'exit', updateKey = 'update' } = options

    const assignState = action(function assignState() {
      let urlValue = config.get(urlKey)

      const setVal = (value = urlValue) => {
        if (this[property] !== value) {
          // console.log(name + ' set', property, value)
          this[property] = value
        }
      }

      if (urlValue !== undefined) {
        // console.log('before load url: `' + property + '`:', this[property]);
        if (urlValue == null) {
          setVal()
        }
        else if (typeof this[property] === 'object' && this[property] !== null) {
          if (typeof urlValue === 'object') {
            if (this[property] instanceof Array) {
              setVal()
            }
            else {
              let Class = this[property].constructor
              // 细化赋值操作，
              // 防止 state change -> url change
              // -> update -> state change (新的实例)
              if (typeof this[property].assign === 'function') {
                this[property].assign(urlValue)
              }
              else {
                setVal(new Class(urlValue))
              }
            }
          }
        }
        else if (typeof this[property] === 'number') {
          setVal(parseFloat(urlValue))
        }
        else if (typeof this[property] === 'boolean') {
          setVal(typeof urlValue === 'boolean' ? urlValue : urlValue === 'true')
        }
        else {
          setVal()
        }

        // console.log('after loaded url: `' + property + '`:', this[property]);
      }
    })

    if (typeof target[property] === 'function') {
      throw new Error('`' + name + '` 不能使用在成员方法中')
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
        console.log('dispose ' + name + ' `' + property + '`')
        release()
        return originExit && originExit.call(this, ...args)
      }

      let origin = target[initKey]
      // eslint-disable-next-line no-use-before-define
      target[initKey] = init(origin, 'init')

      origin = target[updateKey]
      if (loose || origin) {
        target[updateKey] = (
          function (origin) {
            return action(function (...args) {
              assignState.call(this)
              return origin && origin.call(this, ...args)
            })
          }
        )(target[updateKey])
      }


      // eslint-disable-next-line no-inner-declarations
      function init(origin, actionType) {
        return action(function (...args) {
          console.log(actionType + ' ' + name + ' `' + property + '`')
          release()

          if (!isObservable(this, property)) {
            console.warn('`' + property + '` is not observable, `' + name + '` setting it to be observable')
            extendObservable(this, {
              [property]: this[property]
            })
          }

          assignState.call(this)

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


              syncUrlFn = () => {
                config.save(urlKey, this[property], config.fetch())
                syncUrlTimer = void 0
                syncUrlFn = void 0
              }

              if (isFirst) {
                if (options.initialWrite) {
                  syncUrlFn()
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
