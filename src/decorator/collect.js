/**
 * @file collect
 * @author Cuttle Cong
 * @date 2018/1/28
 * @description
 */
import inject from './injectInverseInherit'
import { assertReactClass, displayName } from '../utils/reactUtils'
import get from 'lodash/get'
import set from 'lodash/set'

export async function fetch(source) {
  if (typeof source === 'function') {
    return await source()
  }
  return source
}

function fetchAndPush(ref, path) {
  return fetch(get(ref, path))
    .then(data => {
      set(ref, path, data)
    })
}

const symbol = typeof Symbol === 'function' ? Symbol('collect') : '--[[collect]]--'

/**
 * 收集全局 Store 的数据，一般在需要修改其他页面数据的时候使用；
 * 并且在使用了 webpack **异步加载VM**，搭配 `collect` 使用。
 *
 * 1. 支持直接调用 `const someVM = await collect(this.app.someVM)`
 * 2. 支持修饰器形式调用
 * @public
 * @param {...string} paths
 * @example <caption>app.js</caption>
 * \@bindView(ContainerView)
 * export default class App extends Root {
 *    // 懒加载，代码分割
 *    editVM = () => new Primise(resolve => {
 *      require.ensure([], () => resolve(require('./editVM')))
 *    })
 *    viewVM = () => new Primise(resolve => {
 *      require.ensure([], () => resolve(require('./viewVM')))
 *    })
 * }
 * @example <caption>routes.js</caption>
 * export default {
 *    path: '/',
 *    component: app,
 *    indexRoute: {
 *      getComponent: app.editVM
 *    },
 *    childRoutes: [
 *      {
 *        path: 'view',
 *        getComponent: app.viewVM
 *      }
 *    ]
 * }
 * @example <caption>View.js</caption>
 * \@collect('editVM', 'viewVM')
 * export default class View extends React.Component {
 *    render() {
 *      // 在这可以直接使用
 *      // this.app.editVM
 *      // this.app.viewVM
 *    }
 *
 *    // 在下面的生命周期中，不能直接使用
 *    // 需要 await collect(this.app.editVM) 来异步使用
 *    constructor() {}
 *    componentDidMount() {}
 *    componentWillMount() {}
 * }
 */
export default function collect(...paths) {
  if (
    typeof paths[0] === 'object' && !Array.isArray(paths[0])
    || typeof paths[0] === 'function'
  ) {
    const source = paths[0]
    paths = paths.slice(1)
    // `collect(app.pageA)`
    if (!paths.length) {
      return fetch(source)
    }
    // `collect(app, 'pageA')` // should reset
    return Promise.all(
      paths.map(
        path => fetchAndPush(source, path)
      )
    ).then(() => source)
  }

  return function collectInner(Comp) {
    assertReactClass(Comp, 'collect')
    if (paths.length === 0) {
      return Comp
    }

    class Collect extends Comp {
      static displayName = `Collect-${displayName(Comp)}`
      constructor(...args) {
        super(...args)
        Promise.all(
          paths.map(path =>
            fetchAndPush(this.store.app, path)
          )
        ).then(() => {
          this[symbol] = 'resolved'
          this.forceUpdate()
        })
      }

      render() {
        if (this[symbol] !== 'resolved') {
          return null
        }
        return super.render()
      }
    }

    return inject()(Collect)
  }
}
