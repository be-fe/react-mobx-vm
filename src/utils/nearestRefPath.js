/**
 * @file nearest
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import _ from 'lodash'

export default function nearestRefPath(ref, paths) {
  if (typeof paths === 'string') {
    paths = paths.split('.')
  }
  // 取得最近的 ref
  let latestPaths = paths.slice(0, paths.length - 1)
  if (latestPaths.length) {
    ref = _.get(ref, latestPaths)
  }
  const path = paths[paths.length - 1]
  return {
    ref,
    path
  }
}
