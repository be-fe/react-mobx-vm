/**
 * @file decroator-stateInOut
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */
import sio from '../src/decorator/stateInOut'
import h from '../src/renderer/mixedRenderer'
import { mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'

describe('decroator-stateInOut', function () {
  test('stateInOut spec', () => {

    class State {
      init() {} // didMount
      update() {} // willReceiveProps
      exit() {} // willUnmount
    }
    @sio(State, 'local')
    class View extends React.Component {
      render() {
        return null
      }
    }

    const init = sinon.spy(State.prototype, 'init')
    const update = sinon.spy(State.prototype, 'update')
    const exit = sinon.spy(State.prototype, 'exit')

    const wrapper = mount(<View/>)
    const ref = wrapper.instance()
    expect(ref.local).toBeInstanceOf(State)
    expect(init.calledOnce).toBeTruthy()
    expect(update.callCount).toBe(0)
    expect(exit.callCount).toBe(0)

    wrapper.setProps({ ha: 'ha' })
    expect(update.calledOnceWith(sinon.match({ ha: 'ha' }))).toBeTruthy()
    wrapper.unmount()
    expect(update.calledOnceWith(sinon.match({ ha: 'ha' }))).toBeTruthy()
    expect(exit.calledOnceWith(sinon.match({ ha: 'ha' }))).toBeTruthy()
  })
})
