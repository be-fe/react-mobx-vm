/**
 * @file Router
 * @author Cuttle Cong
 * @date 2018/1/27
 * @description
 */
import * as React from 'react'
import { h } from '../'
import { RouterContext } from 'react-router'

/**
 * 如果你依赖了 **react-router v3**，那么可以使用该 RouterContext 定义，而不是 react-router 的 RouterContext
 * **注意**: 请用以下方式引入
 * `import RouterContext from 'react-mobx-vm/packages/RouterContextV3'`
 * @public
 * @name RouterContext
 */
export default function RouterContextV3({ components, createElement, ...props }) {
  createElement = createElement || h
  if (components) {
    components = components.map(comp => {
      if (comp && typeof comp === 'object') {
        const f = () => {
        }
        f['__[[actual]]__'] = comp
        return f
      }
      return comp
    })
  }

  return (
    <RouterContext
      components={components}
      createElement={function (model, props = {}) {
        const { children, ...rest } = props || {}
        if (model['__[[actual]]__']) {
          model = model['__[[actual]]__']
        }
        return createElement.call(this, model, rest, children)
      }}
      {...props}
    >
      {props.children}
    </RouterContext>
  )
}
