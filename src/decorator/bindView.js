/**
 * @file bindView
 * @author Cuttle Cong
 * @date 2018/1/27
 * @description
 */
import m from './modelComp'
import { observer } from 'mobx-react'

export function getView(Model) {
  if (typeof Model === 'function') {
    return Model.prototype.defaultComp
  }
  return Model && Model.defaultComp
}

/**
 *
 * 用于绑定 ViewModel 中与 Model 中对应的 View
 * @export
 * @param {Function|ReactClass} View
 * @public
 * @example
 * class View extends React.Component {
 *    render() {
 *      this.local.abc === 'abc' // true
 *      this.local.cde === 'cde' // true
 *    }
 * }
 * \@bindView(View)
 * class Model extends Root {
 *    \@observable abc = 'abc'
 *    cde = 'cde'
 *    // ...
 * }
 * @returns {function} Model => BindedViewModel
 */
export default function bindView(View) {
  if (typeof View !== 'function') {
    throw new TypeError('bindView require View is function, but ' + typeof View)
  }
  // observer convert to react Class from function
  View = observer(View)
  View = m(View)

  return function (State) {
    Object.defineProperty(
      State.prototype, 'defaultComp',
      {
        value: View,
        enumerable: false,
        configurable: true,
        writable: true
      }
    )

    return State
  }
}
