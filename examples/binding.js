/**
 * @file binding
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { h, stateless, bindView, binding, bindable, Root } from '../'

const BindableSpan = bindable([
  {
    prop: [
      'children'
    ]
  }
], ({ children }) => <span id="value">{children}</span>)

const View = stateless((local, props) => {
  return (
    <div id="container" className={props.className}>
      <label>Hi</label>
      <input data-bind="name" />
      <BindableSpan data-bind="name" />
    </div>
  )
})
const BindingView = binding(View)

@bindView(BindingView)
class Model extends Root {
  @observable name = 'name'
}

const VM = global.VM = new Model()

ReactDOM.render(
  <VM className="bar"/>,
  window.root
)
