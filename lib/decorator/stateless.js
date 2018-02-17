'use strict';

exports.__esModule = true;
exports.default = stateless;
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
function stateless(func) {
  var localKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'local';

  return function wrappedStateless(props) {
    return func.apply(this, [this[localKey], props]);
  };
}