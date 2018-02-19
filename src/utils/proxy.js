/**
 * @file proxy
 * @author Cuttle Cong
 * @date 2018/1/23
 * @description
 */
import get from 'lodash/get'
import set from 'lodash/set'

export default function proxy(host, path, getValue) {
  const old = get(host, path)
  const newVal = getValue(old)
  set(host, path, newVal)
  return newVal
}
