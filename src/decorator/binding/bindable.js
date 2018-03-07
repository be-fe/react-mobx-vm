/**
 * @file bindable
 * @author Cuttle Cong
 * @date 2018/2/7
 * @description
 */
import { isComponentClass } from '../../utils/reactUtils'
import proxy from '../../utils/proxy'
import * as React from 'react'

const symbol = typeof Symbol === 'function' ? Symbol('bindable') : '__[[bindable]]__'

const bindableTags = {}
export function unBindable(CompOrTagName) {
  if (typeof CompOrTagName === 'string') {
    delete bindableTags[CompOrTagName]
  }
  else if (isComponentClass(CompOrTagName)) {
    delete CompOrTagName[symbol]
  }
}

function normalize(value) {
  // 支持 string
  if (typeof value === 'string') {
    return [[value]]
  }

  if (Array.isArray(value)) {
    value = value.map(val => {
      if (Array.isArray(val)) {
        return val
      }
      return [val]
    })
    return value
  }
  throw new TypeError('bindable options requires string or array, but ' + typeof value)
}

function normalizeOptions(options = {}) {
  if (Array.isArray(options)) {
    return options.map(opt => normalizeOptions(opt))
  }

  let { prop = [], event = [], ...rest } = options
  prop = normalize(prop)
  event = normalize(event)
  return {
    prop,
    event,
    ...rest
  }
}

/**
 * 如果你需要写一些自定义的 bindable 规则，可能你需要用到默认的配置
 * @see [bindable](#bindable)
 * @public
 *
 */
export const DEFAULT_OPTIONS = normalizeOptions({
  // 该批次 process 的条件判断
  cond: null,
  // value 对应的属性名
  prop: ['value'],
  // value 改变的事件名
  event: ['onChange']
})

/**
 *
 * @param Component elem/Comp/tagName
 * @return {*}
 */
export function getOptionsList(Component) {
  if (React.isValidElement(Component)) {
    return Component.type && getOptionsList(Component.type)
  }
  if (typeof Component === 'string') {
    return bindableTags[Component.toLowerCase()]
  }
  return Component && Component[symbol]
}

export function getHandledProps(ctx, elementOrComponent, oldProps) {
  let optList = getOptionsList(elementOrComponent) || [DEFAULT_OPTIONS]

  const props = { ...oldProps }
  optList.some(opt => {
    if (
      typeof opt.cond === 'function'
      && !opt.cond(oldProps, ctx)
    ) {
      return false
    }
    opt.prop.forEach(([name, transform]) => {
      if (typeof transform !== 'function') {
        transform = v => v
      }
      // overwrite value
      props[name] = transform(ctx.get(), oldProps[name], oldProps, ctx)
    })

    opt.event.forEach(([name, handle]) => {
      if (typeof handle !== 'function') {
        handle = function ([event]) {
          return event
                 && typeof event.target === 'object'
                 && 'value' in event.target
            ? event.target.value
            : event
        }
      }
      proxy(props, name, function (onChange) {
        return async function (...argvs) {
          const rlt = onChange && await onChange.apply(this, argvs)
          if (rlt !== false) {
            // continue, not skip
            const newValue = handle.apply(this, [argvs, ctx])

            // handle will be regard as transform
            // when return something
            if (typeof newValue !== 'undefined') {
              ctx.set(newValue)
            }
          }
          else {
            return rlt
          }
        }
      })
    })
    return true
  })

  return props
}

/**
 * 搭配[binding](#binding)使用，可以定义自己的 binding 规则
 * @public
 * @param [options=DEFAULT_OPTIONS] {object}
 * @param [options.cond=null] {function} props => boolean
 *       是否匹配上
 * @param [options.prop=['value']] {[[propName: string, transform: function] | string]}
 *       需要绑定的属性定义，可以通过 transform 进行转换
 * @param [options.event=['onChange']] {[[propName: string, handler: function] | string]}
 *       需要绑定的属性定义，可以通过 transform 进行转换
 * @param tagName {String | ReactComponent}
 *   被绑定的组件，可以为 HTML标签名 或 ReactComponent
 * @return {Bindable}
 * @see [examples/binding#bindable](../examples/binding.md#bindable)
 * @example
 * bindable([{
 *    cond: function (props) {
 *      return props.type === 'checkbox'
 *    },
 *    prop: [
 *      ['checked', function (modelValue, propVal, props) {
 *        return modelValue.includes(props.name)
 *      }]
 *    ],
 *    event: [
 *      ['onChange', function (evt, ctx) {
 *        const { target: { name, checked } } = evt
 *        const list = ctx.get()
 *        let i = list.indexOf(name)
 *        i >= 0 && list.splice(i, 1)
 *        if (checked) {
 *          list.push(name)
 *        }
 *      }]
 *    ]
 *  }].concat(DEFAULT_OPTIONS), 'input')
 *
 *  class Scope {
 *    \@observable value = 'val'
 *    \@observable checkedList = []
 *  }
 *  const scope = new Scope
 *
 *  \@observer
 *  class View extends React.Component {
 *    render() {
 *      return (
 *        <div>
 *          {binding(scope)(
 *            <input type="text" id="text" data-bind="value" data-scope={scope}/>,
 *            <input type="checkbox" id="a_0" data-bind="checkedList" name={'a'}/>,
 *            <input type="checkbox" id="a_1" data-bind="checkedList" name={'a'}/>,
 *            <input type="checkbox" id="b_0" data-bind="checkedList" name={'b'}/>,
 *          )}
 *          <input id="test" data-bind="value"/>
 *        </div>
 *      )
 *    }
 *  }
 *
 */
export default function bindable(options, tagName) {
  options = options || DEFAULT_OPTIONS
  options = normalizeOptions(options)
  if (!Array.isArray(options)) {
    options = [options]
  }


  if (typeof tagName === 'string') {
    bindableTags[tagName.toLowerCase()] = options
    return
  }
  if (typeof tagName === 'function') {
    tagName[symbol] = options
    return tagName
  }

  return function Bindable(Component) {
    Component[symbol] = options
    return Component
  }
}
