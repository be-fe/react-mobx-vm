/**
 * @file: decorator-bindView
 * @author: Cuttle Cong
 * @date: 2018/2/15
 * @description:
 */
import React from 'react'
import h from '../src/renderer/mixedRenderer'
import { observable } from 'mobx'
import { mount } from 'enzyme'
import bindView, { getView } from '../src/decorator/bindView'


describe('decorator-bindView', function () {
  class View extends React.Component {
    render() {
      return <div>
        <span id="name">{ this.local.name }</span>
        <span id="value">{ this.local.value }</span>
      </div>
    }
  }

  @bindView(View)
  class Model {
    @observable name = 'name'
    value = 'value'
  }

  test('error/spec arguments', () => {
    expect(() => bindView({})).toThrow()
    expect(() => bindView(() => {})).not.toThrow()
  })

  test('getView', () => {
    expect(getView(Model) === getView(new Model())).toBeTruthy()
    expect(getView(Model) !== View).toBeTruthy()
  })

  test('observable & unObservable', () => {
    const VM = new Model()
    const wrapper = mount(<VM/>)
    expect(wrapper.find('#name').text()).toBe('name')
    expect(wrapper.find('#value').text()).toBe('value')
    VM.name = 'updatedName'
    expect(wrapper.find('#name').text()).toBe('updatedName')
    VM.value = 'updatedValue'
    expect(wrapper.find('#value').text()).toBe('value')
    VM.name = 'trigger'
    expect(wrapper.find('#value').text()).toBe('updatedValue')
  })
})
