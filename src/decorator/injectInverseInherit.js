/**
 * @file injectInverseInherit
 * @author Cuttle Cong
 * @date 2018/1/27
 * @description
 */
import PropTypes from 'prop-types'
import { displayName, isComponentClass } from '../utils/reactUtils'

function injectCore(Comp) {
  return class Inject extends Comp {
    static displayName = `Inject-${displayName(Comp)}`
    static contextTypes = {
      ...Comp.contextTypes,
      mobxStores: PropTypes.any
    }

    get store() {
      return this.context.mobxStores
    }

    constructor(...args) {
      super(...args)
      if (this.store.app) {
        Object.defineProperty(this, 'app', {
          get: function () {
            return this.store.app
          },
          configurable: true
        })
      }
    }
  }
}

/**
 * 视图上注入全局 store
 * @public
 * @export
 * @name inject
 * @param {...string} [props=['app']]
 * @returns {function}
 * (ReactComponent) => InjectedComponent
 * @example
 * \@inject
 * class View extends React.Component {
 *    render() {
 *      // this.app
 *    }
 * }   
 */
export default function (...props) {
  if (arguments.length === 1 && isComponentClass(arguments[0])) {
    return injectCore(arguments[0])
  }

  if (!props.length) {
    props = ['app']
  }
  const contextTypes = {}
  props.forEach(prop => {
    contextTypes[prop] = PropTypes.any
  })

  return injectCore
}
