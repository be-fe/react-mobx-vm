/**
 * @file: routesBindProgress
 * @author: Cuttle Cong
 * @date: 2018/1/23
 * @description:
 */
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import routesWalk from './routesWalk'
import proxy from './proxy'

export default function routesBindProgress(routes) {
  routesWalk(routes, route => {
    proxy(route, 'onEnter', function (old) {
      return function () {
        if (typeof document !== 'undefined') {
          Nprogress.start()
        }
        if (old) {
          return old.apply(this, arguments)
        }
      }
    })
  })
}
