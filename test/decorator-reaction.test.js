/**
 * @file decorator-reaction
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */

import { observable } from 'mobx/lib/mobx'
import { mount } from 'enzyme'
import React from 'react'
import bindView from '../src/decorator/bindView'
import Root from '../src/Model/Root'
import reaction from '../src/decorator/reaction'
import reactReaction from '../src/decorator/reaction/react'
import h from '../src/renderer/mixedRenderer'

describe('decorator-reaction', function () {
  test('error', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      class ErrorView extends React.Component {
        @observable ob = '123'
        @reactReaction()
        reactReaction() {}
        render() {
          return null
        }
      }
    }).toThrow(/should pass some refPaths/)

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      class ErrorView extends React.Component {
        @reactReaction('abc')
        @observable ob = '123'
        render() {
          return null
        }
      }
    }).toThrow(/should used in member method/)
  })

  test('spec in View', () => {
    let obb = ''
    class View extends React.Component {
      @observable ob = 'ob'
      @reactReaction('ob')
      reactReaction(ob, dispose) {
        obb = ob.toUpperCase()
        dispose && dispose()
      }
      render() {
        return null
      }
    }

    const instance = mount(<View/>).instance()
    expect(instance.ob).toBe('ob')
    expect(obb).toBe('')
    instance.ob = 'xyz'
    expect(obb).toBe('XYZ')
    instance.ob = 'xyzxx'
    expect(obb).toBe('XYZ')
  })


  test('spec in Model', () => {
    class View extends React.Component {
      render() {
        return null
      }
    }

    let obb = '', aa = ''
    @bindView(View)
    class Model extends Root {
      @observable ob = 'ob'
      @observable deep = { a: 'ob' }
      @reaction('ob', 'deep.a')
      reactReaction(ob, a, dispose) {
        obb = ob.toUpperCase()
        aa = a
        dispose && dispose()
      }
    }
    const VM = new Model
    mount(<VM/>)
    expect(VM.ob).toBe('ob')
    expect(obb).toBe('')
    expect(aa).toBe('')
    VM.ob = 'xyz'
    expect(obb).toBe('XYZ')
    expect(aa).toBe('ob')
    VM.ob = 'xyzxx'
    expect(obb).toBe('XYZ')
    expect(aa).toBe('ob')
  })

})
