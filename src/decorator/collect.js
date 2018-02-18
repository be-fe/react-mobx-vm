/**
 * @file: collect
 * @author: Cuttle Cong
 * @date: 2018/1/28
 * @description:
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

const symbol = typeof Symbol === 'function' ? Symbol('collect') : '--[[collect]]--'

export default function (...paths) {
  if (
    !Array.isArray(arguments[0]) && arguments[0]
    && (
      typeof arguments[0] === 'object' || typeof arguments[0] === 'function'
    )
  ) {
    return fetch(arguments[0])
  }

  return function collect(Comp) {
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
            fetch(get(this.store.app, path))
              .then(data => {
                set(this.store.app, path, data)
              })
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
