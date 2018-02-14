/* eslint-disable indent */
/**
 * @file: render-mixRenderer.test
 * @author: Cuttle Cong
 * @date: 2018/2/14
 * @description:
 * @jest-environment jsdom
 */
import React from 'react'
import { observable } from 'mobx'
import sinon from 'sinon'
import { render, mount } from 'enzyme'
import h from '../src/renderer/mixedRenderer'
import bind from '../src/decorator/bindView'

describe('render-mixRenderer', function () {
  test('<View/>', () => {
    class View extends React.Component {
      componentDidMount() {
      }
      componentDidUpdate() {
      }
      render() {
        const { name = 'default' } = this.props
        return (
          h('div', 'div-class', { title: 'im title' },
            'hello',
            <span title={name}>
              {name}
            </span>,
            'world'
          )
        )
      }
    }
    sinon.spy(View.prototype, 'componentDidMount')
    sinon.spy(View.prototype, 'componentDidUpdate')
    const wrapped = mount(<View/>)
    wrapped.setProps({ name: 'over' })
    wrapped.setProps({ name: 'over again' })

    expect(View.prototype.componentDidMount.calledOnce).toBe(true)
    expect(View.prototype.componentDidUpdate.calledTwice).toBe(true)
    expect(
      wrapped.text()
    ).toBe('helloover againworld')
    expect(
      wrapped.getDOMNode().getAttribute('class')
    ).toBe('div-class')

    const span = render(<View name={'cust'}/>).find('span')
    expect(
      span.text()
    ).toBe('cust')
    expect(
      span.attr('title')
    ).toBe('cust')
  })


  test('<ViewModel/>', () => {
    class View extends React.Component {
      render() {
        return (
          <div className={this.props.className}>
            {this.local.name}
            {this.props.children}
          </div>
        )
      }
    }

    @bind(View)
    class Model {
      @observable name = 'model'
    }

    const VM = new Model()
    const wrapper = mount(h(VM, 'class-abc'))
    expect(VM.name).toBe('model')
    expect(wrapper.text()).toBe('model')
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('class-abc')
    VM.name = 'haha'
    expect(wrapper.text()).toBe('haha')

    const dom = render(h(VM, {}, 'class-abc'))
    expect(dom.text()).toBe('hahaclass-abc')
  })
})
