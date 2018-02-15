/**
 * @file   style-useable-hmr
 * @author yucong02
 */
import { toJS } from 'mobx'

export default function (StateClass, keyName = 'localState', initData = {}) {
  return componentClass => {
    if (typeof initData === 'function') {
      initData = initData()
    }
    return class SIO extends componentClass {
      // [refAPI]
      getState() {
        return this[keyName]
      }

      // [refAPI]
      getStateJSON() {
        return toJS(this[keyName])
      }

      constructor(p) {
        const out = super(p)
        this[keyName] = typeof StateClass !== 'function' ? StateClass : new StateClass(initData)

        return out
      }

      // WillMount 修改为 DidMount
      // 因为上一个 componentWillUnmount
      //  发生晚于 componentWillMount
      //      会出现先 注册 urlsync (componentWillMount)
      //      然后会立即注销 urlsync (componentWillUnmount)
      componentDidMount(...args) {
        this[keyName].init && this[keyName].init(this.props)
        if (super.componentDidMount) {
          super.componentDidMount.apply(this, args)
        }
      }

      componentWillReceiveProps(...args) {
        if (this[keyName].update) {
          this[keyName].update(args[0])
        } else if (this[keyName].init) {
          this[keyName].init(args[0])
        }
        if (super.componentWillReceiveProps) {
          super.componentWillReceiveProps.apply(this, args)
        }
      }

      componentWillUnmount(...args) {
        this[keyName].exit && this[keyName].exit(this.props)
        if (super.componentWillUnmount) {
          super.componentWillUnmount.apply(this, args)
        }
      }
    }
  }
}
