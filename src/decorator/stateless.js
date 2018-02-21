/**
 * @file stateless
 * @author Cuttle Cong
 * @date 2018/2/7
 * @description
 */

/**
 * 用于书写一些无组件自身状态的简单组件
 * @public
 * @param func {function} (local, props) => ReactElement
 * @param [localKey='local'] {string}
 * @example
 * export default stateless((local, props) =>
 *   <div></div>
 * )
 * @returns {function} props => ReactElement
 */
export default function stateless(func, localKey = 'local') {
  return function wrappedStateless(props) {
    return func.apply(this, [this[localKey], props])
  }
}
