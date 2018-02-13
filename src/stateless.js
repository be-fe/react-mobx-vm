/**
 * @file: stateless
 * @author: Cuttle Cong
 * @date: 2018/2/7
 * @description:
 */

/**
 * we can use
 *     export default stateless((local, props) => elem)
 * @param func  {function}
 * @param localKey {string}
 */
export default function stateless(func, localKey = 'local') {
  return function wrappedStateless(props) {
    return func.apply(this, [this[localKey], props])
  }
}
