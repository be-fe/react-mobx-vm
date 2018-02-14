/**
 * @file: bindView
 * @author: Cuttle Cong
 * @date: 2018/1/27
 * @description:
 */
import m from './modelComp'
import { observer } from 'mobx-react'
import getViewId from '../utils/increaseId'
import { assertReactClass } from '../utils/reactUtils'

export function getView(Model) {
  if (typeof Model === 'function') {
    return Model.prototype.defaultComp
  }
  return Model && Model.defaultComp
}

export default function bindView(View) {
  if (typeof View !== 'function') {
    throw new TypeError('bindView require View is function, but ' + typeof View)
  }
  assertReactClass(View, 'bindView')

  View = observer(View)
  View = m(View)

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
