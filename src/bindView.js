/**
 * @file: bindView
 * @author: Cuttle Cong
 * @date: 2018/1/27
 * @description:
 */
import m, { isViewModel } from './modelComp'
import { observer } from 'mobx-react'
import getViewId from './utils/increaseId'

export default function bindView(View) {
  if (typeof View !== 'function') {
    throw new TypeError('bindView require View is function, but ' + typeof View)
  }
  View = observer(View)
  View = isViewModel(View) ? View : m(View)

  return function (State) {
    Object.defineProperty(
      State.prototype, 'defaultComp',
      {
        value: View,
        enumerable: false,
        configurable: true
      }
    )

    Object.defineProperty(
      State.prototype, 'viewId',
      {
        value: getViewId(),
        enumerable: false,
        configurable: true
      }
    )
  }
}
