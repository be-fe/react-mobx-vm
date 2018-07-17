/**
 * @file proxy
 * @author Cuttle Cong
 * @date 2018/1/23
 * @description
 */
import { set, get, PropertyPath } from 'lodash'

export default function proxy(
  host: any,
  path: PropertyPath,
  getValue: (old: any) => any
) {
  const old = get(host, path)
  const newVal = getValue(old)
  set(host, path, newVal)
  return newVal
}
