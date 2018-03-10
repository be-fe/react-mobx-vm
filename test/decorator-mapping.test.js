/**
 * @file decorator-mapping
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */
import { mount } from 'enzyme'
import React from 'react'
import { observable } from 'mobx'
import bindView from '../src/decorator/bindView'
import mapping from '../src/decorator/mapping'
import h from '../src/renderer/mixedRenderer'


describe('decorator-mapping', function () {

  @mapping(['hi', { 'foo': 'bar', 'd.d': 'dd' }, 'h.h'])
  class View extends React.Component {
    render() {
      return (
        <div>
          <span id="hi">{this.local.hi}</span>
          <span id="bar">{this.local.bar}</span>
          <span id="dd">{this.local.dd}</span>
        </div>
      )
    }
  }

  @bindView(View)
  class Model {
    @observable hi = 'hi'
    @observable bar = 'bar'
    @observable noEffect = '1'
  }

  const VM = new Model()
  const wrapper = mount(
    <VM hi={'firstHi'} noEffect={'noEffect'}/>
  )


  test('`noEffect`', () => {
    expect(VM.noEffect).toBe('1')
  })

  test('`hi`', () => {
    expect(VM.hi).toBe('firstHi')
    expect(wrapper.find('#hi').text()).toBe('firstHi')

    wrapper.setProps({ hi: 'updated' })
    expect(VM.hi).toBe('updated')
    expect(wrapper.find('#hi').text()).toBe('updated')
  })

  test('`foo: bar`', () => {
    // foo -> bar
    expect(VM.bar).toBe('bar')
    expect(wrapper.find('#bar').text()).toBe('bar')

    wrapper.setProps({ bar: 'updated' })
    expect(VM.bar).toBe('bar')

    wrapper.setProps({ foo: 'updated' })
    expect(VM.bar).toBe('updated')
    expect(wrapper.find('#bar').text()).toBe('updated')
  })

  test('`d.d: dd`', () => {
    expect(wrapper.find('#dd').text()).toBe('')

    wrapper.setProps({ foo: 'ff' })
    wrapper.setProps({ d: { d: ['dd', '2'] } })
    expect(wrapper.find('#dd').text()).toBe('dd2')
    expect(wrapper.find('#bar').text()).toBe('ff')
  })
})
