/**
 * @file: decorator-binding
 * @author: Cuttle Cong
 * @date: 2018/2/15
 * @description:
 */

import { observable, toJS } from 'mobx/lib/mobx'
import { mount } from 'enzyme'
import React from 'react'
import { observer } from 'mobx-react'
import bindView from '../src/decorator/bindView'
import binding from '../src/decorator/binding'
import bindable, { DEFAULT_OPTIONS } from '../src/decorator/binding/bindable'
import h from '../src/renderer/mixedRenderer'

describe('decorator-binding', function () {
  test('spec binding(scope)(...elements)', () => {
    class Scope {
      @observable value = 'val'
    }
    const scope = new Scope
    @observer
    class View extends React.Component {
      render() {
        return binding(scope)(
          <input data-bind="value" />
        )
      }
    }

    const wrapper = mount(<View/>)
    expect(wrapper.find('input').render().val()).toBe('val')
    wrapper.find('input').simulate('change', { target: { value: 'newVal' } })
    expect(wrapper.find('input').render().val()).toBe('newVal')

    wrapper.find('input').simulate('change', { target: { value: 'VAR' } })
    expect(wrapper.find('input').render().val()).toBe('VAR')
    expect(scope.value).toBe('VAR')

    scope.value = 'ABC'
    expect(wrapper.find('input').render().val()).toBe('ABC')
  })

  test('spec binding(scope) Component', () => {
    class Scope {
      @observable value = 'val'
    }
    const scope = new Scope

    @binding(scope)
    class View extends React.Component {
      render() {
        return <div>
          <input data-bind="value" />
        </div>
      }
    }

    const wrapper = mount(<View/>)
    const input = wrapper.find('input')
    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('newVal')

    input.simulate('change', { target: { value: 'VAR' } })
    expect(input.render().val()).toBe('VAR')
    expect(scope.value).toBe('VAR')

    scope.value = 'ABC'
    expect(input.render().val()).toBe('ABC')
  })

  test('spec binding(scope) function', () => {
    class Scope {
      @observable value = 'val'
    }
    const scope = new Scope
    const View = binding(scope)(function () {
      return <input data-bind="value" />
    })

    const wrapper = mount(<View/>)
    const input = wrapper.find('input')
    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('newVal')

    input.simulate('change', { target: { value: 'VAR' } })
    expect(input.render().val()).toBe('VAR')
    expect(scope.value).toBe('VAR')

    scope.value = 'ABC'
    expect(input.render().val()).toBe('ABC')
  })

  test('spec @binding Component', () => {
    @binding
    class View extends React.Component {
      render() {
        return <input data-bind="value" />
      }
    }
    @bindView(View)
    class Scope {
      @observable value = 'val'
    }
    const VM = new Scope

    const wrapper = mount(<VM/>)
    const input = wrapper.find('input')
    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('newVal')

    input.simulate('change', { target: { value: 'VAR' } })
    expect(input.render().val()).toBe('VAR')
    expect(VM.value).toBe('VAR')

    VM.value = 'ABC'
    expect(input.render().val()).toBe('ABC')
  })

  test('spec @binding function', () => {
    const View = binding(function () {
      return <input data-bind="value" />
    })
    @bindView(View)
    class Scope {
      @observable value = 'val'
    }
    const VM = new Scope

    const wrapper = mount(<VM/>)
    const input = wrapper.find('input')
    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('newVal')

    input.simulate('change', { target: { value: 'VAR' } })
    expect(input.render().val()).toBe('VAR')
    expect(VM.value).toBe('VAR')

    VM.value = 'ABC'
    expect(input.render().val()).toBe('ABC')
  })

  test('spec binding ...element', () => {
    class Scope {
      @observable value = 'val'
    }
    const scope = new Scope
    const View = observer(() => binding(<input data-bind="value" data-scope={scope}/>))
    const wrapper = mount(<View/>)
    const input = wrapper.find('input')

    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('newVal')

    input.simulate('change', { target: { value: 'VAR' } })
    expect(input.render().val()).toBe('VAR')
    expect(scope.value).toBe('VAR')

    scope.value = 'ABC'
    expect(input.render().val()).toBe('ABC')
  })

  test('spec binding in member method', () => {
    class View extends React.Component {
      @binding
      get InnerView() {
        return <input data-bind="value" />
      }
      render() {
        return (
          <div>
            {this.InnerView}
            <span data-bind="value"/>
          </div>
        )
      }
    }
    @bindView(View)
    class Scope {
      @observable value = 'val'
    }
    const scope = new Scope()

    const wrapper = mount(h(scope))
    const input = wrapper.find('input')
    expect(input.render().attr('data-bind')).toBeUndefined()
    expect(wrapper.find('span').render().attr('data-bind')).toBe('value')
    expect(wrapper.find('span').render().val()).toBeUndefined()

    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('newVal')

    input.simulate('change', { target: { value: 'VAR' } })
    expect(input.render().val()).toBe('VAR')
    expect(scope.value).toBe('VAR')

    scope.value = 'ABC'
    expect(input.render().val()).toBe('ABC')
  })

  test('spec intercept onChange', () => {
    class Scope {
      @observable value = 'val'
    }
    const scope = new Scope
    const View = observer(() =>
      binding(
        <input
          onChange={() => {
            scope.value = 'fixed'
            return false
          }}
          data-bind="value" data-scope={scope}
        />
      )
    )
    const wrapper = mount(<View/>)
    const input = wrapper.find('input')

    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('fixed')

    input.simulate('change', { target: { value: 'VAR' } })
    expect(input.render().val()).toBe('fixed')
    expect(scope.value).toBe('fixed')

    scope.value = 'ABC'
    expect(input.render().val()).toBe('ABC')
  })


  test('spec bindable', () => {
    bindable([{
      cond: function (props) {
        return props.type === 'checkbox'
      },
      // flatten
      prop: [
        ['checked', function (modelValue, propVal, props) {
          return modelValue.includes(props.name)
        }]
      ],
      event: [
        ['onChange', function (evt, ctx) {
          const { target: { name, checked } } = evt
          const list = ctx.get()
          let i = list.indexOf(name)
          i >= 0 && list.splice(i, 1)
          if (checked) {
            list.push(name)
          }
        }]
      ]
    }].concat(DEFAULT_OPTIONS), 'input')

    class Scope {
      @observable value = 'val'
      @observable checkedList = []
    }
    const scope = new Scope

    @observer
    class View extends React.Component {
      render() {
        return (
          <div>
            {binding(scope)(
              <input type="text" id="text" data-bind="value" data-scope={scope}/>,
              <input type="checkbox" id="a_0" data-bind="checkedList" name={'a'}/>,
              <input type="checkbox" id="a_1" data-bind="checkedList" name={'a'}/>,
              <input type="checkbox" id="b_0" data-bind="checkedList" name={'b'}/>,
            )}
            <input id="test" data-bind="value"/>
          </div>
        )
      }
    }
    const wrapper = mount(<View/>)
    const input = wrapper.find('input#text')

    expect(input.render().val()).toBe('val')
    input.simulate('change', { target: { value: 'newVal' } })
    expect(input.render().val()).toBe('newVal')

    scope.checkedList.push('a')
    scope.value = 'update'
    expect(input.render().val()).toBe('update')

    // trigger update
    wrapper.update()
    expect(wrapper.find('input#a_0').prop('checked')).toBeTruthy()
    expect(wrapper.find('input#a_1').prop('checked')).toBeTruthy()
    expect(wrapper.find('input#b_0').prop('checked')).toBeFalsy()

    // unbinding
    expect(wrapper.find('input#test').render().val()).toBeUndefined()
  })
})
