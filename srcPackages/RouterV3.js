/**
 * @file Router
 * @author Cuttle Cong
 * @date 2018/1/27
 * @description
 */
import * as React from 'react'
import { h } from '../'
import { Router } from 'react-router'
import RouterContext from './RouterContextV3'

/**
 * 如果你依赖了 **react-router v3**，那么可以使用该 Router 定义，而不是 react-router 的 Router
 * **注意**: 请用以下方式引入
 * `import Router from 'react-mobx-vm/packages/RouterV3'`
 * @public
 * @name Router
 */
export default function VMRouter(props = {}) {
  function render(props) {
    return <RouterContext {...props} />
  }

  return <Router render={render} {...props} />
}
