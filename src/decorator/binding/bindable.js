/**
 * @file: bindable
 * @author: Cuttle Cong
 * @date: 2018/2/7
 * @description:
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
        handle = function (event) {
          return typeof event.target === 'object'
                 && 'value' in event.target
            ? event.target.value : event
        }
      }
      proxy(props, name, function (onChange) {
        return function (event) {
          const rlt = onChange && onChange.apply(this, arguments)
          if (rlt !== false) {
            // continue, not skip
            const newValue = handle.apply(this, [event, ctx])

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
 *
 * @param options
 * @param tagName {String|Function}
 * @return {Bindable}
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
