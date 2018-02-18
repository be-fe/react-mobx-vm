/**
 * @file: collect
 * @author: Cuttle Cong
 * @date: 2018/1/28
 * @description:
 */
import get from 'lodash/get'
import set from 'lodash/set'
import { action } from 'mobx'
import { assertReactClass, displayName } from '../utils/reactUtils'

const assign = action(function (rule, props, model) {
  // @action
  function setValue(model, path, value) {
    set(model, path, value)
  }

  let oldVal
  let newVal
  if (typeof rule === 'string') {
    oldVal = get(model, rule)
    newVal = get(props, rule)
    if (newVal !== oldVal) {
      setValue(model, rule, newVal)
    }
  }
  else if (Array.isArray(rule)) {
    rule.forEach(eachRule =>
      assign(eachRule, props, model)
    )
  }
  else if (typeof rule === 'object') {
    for (let propPath in rule) {
      if (rule.hasOwnProperty(propPath)) {
        oldVal = get(model, rule[propPath])
        newVal = get(props, propPath)
        if (newVal !== oldVal) {
          setValue(model, rule[propPath], newVal)
        }
      }
    }
  }
})

/**
 * 将 View 层的 props 映射同步至 model
 * @param mapper {Array|Object|string}
 *      { propName: modelName } | [string, object]
 * @return View
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
