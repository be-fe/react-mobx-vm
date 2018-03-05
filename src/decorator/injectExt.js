/**
 * @file injectExt
 * @author Cuttle Cong
 * @date 2018/1/28
 * @description
 */
import { displayName } from '../utils/reactUtils'
import inject from './injectInverseInherit'

/**
 * 注入全局 store，并且可以进行一些额外操作.
 * @public
 * @export
 * @param {string} [name='app']
 * @param {function} action
 * @returns {function}
 * (ReactComponent) => InjectedComponent
 * @example
 * \@injectExt(app => {
 *   // some action here
 * })
 * class View extends React.Component {
 *    render() {
 *      // this.app
 *    }
 * }
 */
export default function injectExt(name, action) {
  if (typeof name === 'function') {
    action = name
    name = 'app'
  }
  if (typeof name === 'undefined') {
    name = 'app'
  }
  return function (Comp) {
    @inject(name)
    class InjectExt extends Comp {
      static displayName = `Ext-${displayName(Comp)}`
      constructor(...p) {
        super(...p)
        action && action.call(this, this.store[name])
      }
    }

    return InjectExt
  }
}
