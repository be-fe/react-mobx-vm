/**
 * @file: routesWalk
 * @author: Cuttle Cong
 * @date: 2018/1/23
 * @description:
 */

export default function routesWalk(
  routes,
  track = () => {}
) {
  if (!Array.isArray(routes)) {
    routes = [routes]
  }

  routes.forEach(route => {
    track(route)
    if (route.indexRoute) {
      routesWalk(route.indexRoute, track)
    }
    if (route.childRoutes) {
      routesWalk(route.childRoutes, track)
    }
  })
}
