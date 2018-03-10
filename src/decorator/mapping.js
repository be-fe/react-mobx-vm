/**
 * @file collect
 * @author Cuttle Cong
 * @date 2018/1/28
 * @description
 */
import get from 'lodash/get'
import set from 'lodash/set'
import hasIn from 'lodash/hasIn'
import { action } from 'mobx'
import { assertReactClass, displayName } from '../utils/reactUtils'

const assign = action(function (rule, props, model) {
  // @action
  function setValue(propPath, modulePath) {
    if (hasIn(props, propPath)) {
      let oldVal = get(model, modulePath)
      let newVal = get(props, propPath)
      if (newVal !== oldVal) {
        set(model, modulePath, newVal)
      }
    }
  }

  if (typeof rule === 'string') {
    setValue(rule, rule)
  }
  else if (Array.isArray(rule)) {
    rule.forEach(eachRule =>
      assign(eachRule, props, model)
    )
  }
  else if (typeof rule === 'object') {
    for (let propPath in rule) {
      if (rule.hasOwnProperty(propPath)) {
        setValue(propPath, rule[propPath])
      }
    }
  }
})

/**
 * 将 View 层的 props 同步映射至 model
 * @param mapper {[mapper] | {propName, modelName: string} | string}
 * @public
 * @returns {function} View => MappingView
 * @example
 * \@mapping(['abc.d', { 'prop': 'model' }])
 * class View extends React.Component {
 *    render() {
 *      // this.local.abc.d === this.props.abc.d
 *      // this.local.model === this.props.prop
 *    }
 * }
 */
export default function mapping(mapper) {
  if (
    !Array.isArray(mapper)
    && typeof mapper !== 'object'
    && typeof mapper !== 'string'
  ) {
    throw new TypeError('@mapping(mapper): mapper require Array String or Object, but ' + typeof mapper)
  }

  return function mappingCore(Component) {
    assertReactClass(Component, 'mapping')

    class Mapping extends Component {
      static displayName = `Mapping-${displayName(Component)}`
      componentWillMount() {
        assign(mapper, this.props, this.local)
        super.componentWillMount && super.componentWillMount.apply(this, arguments)
      }

      componentWillReceiveProps(newProps) {
        assign(mapper, newProps, newProps.local)
        super.componentWillReceiveProps && super.componentWillReceiveProps.apply(this, arguments)
      }
    }

    return Mapping
  }
}
