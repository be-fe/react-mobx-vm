/**
 * @file injectInverseInherit
 * @author Cuttle Cong
 * @date 2018/1/27
 * @description
 */
import PropTypes from 'prop-types'
import { displayName } from '../utils/reactUtils'

export default function (...props) {
  if (!props.length) {
    props = ['app']
  }
  const contextTypes = {}
  props.forEach(prop => {
    contextTypes[prop] = PropTypes.any
  })

  return function (Comp) {
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
}
