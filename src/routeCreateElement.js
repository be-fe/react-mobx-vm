import NProgress from 'nprogress'
/**
 * @file: routeCreateElement
 * @author: Cuttle Cong
 * @date: 2018/1/27
 * @description:
 */
import h from './mixedRenderer'

export default function createElement() {
  NProgress.done()

  return h.apply(this, arguments)
}
