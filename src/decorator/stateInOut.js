/**
 * @file   style-useable-hmr
 * @author yucong02
 */
import { toJS } from 'mobx'
import { displayName } from '../utils/reactUtils'

/**
 * 绑定 Model 至 View 中，将会挂载一些 View 的[生命周期](../advanced/life-cycle.md)至 Model 中
 * @public 
 * @name stateInOut
 * @export
 * @param {function} StateClass 
 * @param {string} [keyName='local'] 
 * @param {object} [initData={}] 
 * @returns {function} View => View
 * @example
 * \@stateInOut(StateClass)
 * class View extends React.Component {
 *    render() {
 *      // this.local 可以访问 StateClass 的实例
 *    }
 * }
 */
export default function (StateClass, keyName = 'local', initData = {}) {
  return componentClass => {
    if (typeof initData === 'function') {
      initData = initData()
    }
    return class SIO extends componentClass {
      static displayName = `SIO-${displayName(componentClass)}`
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
