import { displayName } from '../utils/reactUtils'
/**
 * @file: injectExt
 * @author: Cuttle Cong
 * @date: 2018/1/28
 * @description:
 */
import inject from './injectInverseInherit'

export default function injectExt(name, action) {
  if (typeof name === 'function') {
    action = name
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
