/**
 * @file Model-SymbolicLink
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import { SymbolicLink, SymbolicCustom, Symbolic, observable } from '../src/index'
import { reaction } from 'mobx'
import sinon from 'sinon'


describe('Model-SymbolicLink', function () {

  class Panel extends SymbolicLink {
    @observable title = '123'
    @observable sub = {}
    @observable deep = {
      ref: 1
    }
    @observable ob = 'xx'
    @observable isOpen = true
  }

  class Model extends SymbolicLink {
    title = 'modelTitle'
    // @todo bug
    /*@observable */
    panel = Panel.create({
      title: Symbolic(this, 'title', ''),
      sub: Symbolic(this, 'ob', { 'abc': '' }),
      'deep.ref': Symbolic(this, 'panelRef.ref', 'panelRef'),
      'isOpen': SymbolicCustom({
        get() {
          return 'fixed'
        }
      }, 'false')
    })
    @observable panelRef = {
      ref: ''
    }
    @observable ob = 'obTitle'
  }

  test('Model-SymbolicLink spec', () => {
    let m = Model.create()

    expect(m.ob).toEqual({ 'abc': '' })
    expect(m.panel.title).toBe('')
    expect(m.title).toBe('')

    expect(m.panelRef.ref).toBe('panelRef')
    expect(m.panel.deep.ref).toBe('panelRef')

    m.panel.title = 'title'
    expect(m.title).toBe('title')
    expect(m.panel.title).toBe('title')
  })

  test('Model-SymbolicLink setSymbolic', () => {
    let m = Model.create()

    m.panel.title = 'title'
    expect(m.panel.isOpen).toBe('fixed')
    m.panel.isOpen = 'abcc'
    console.log(Object.getOwnPropertyDescriptor(m.panel, 'isOpen'))
    expect(m.panel.isOpen).toBe('fixed')

    expect(m.title).toBe('title')
    expect(m.panel.title).toBe('title')

    const oldObVal = m.ob
    m.panel.setSymbolic(
      'title',
      Symbolic(m, 'ob')
    )

    expect(m.panel.title).toBe(oldObVal)
    expect(m.ob).toBe(oldObVal)
    // set undefined
    m.panel.setValue('title', )
    expect(m.panel.title).toBeUndefined()
    expect(m.ob).toBeUndefined()

    m.ob = 'ob'
    expect(m.panel.title).toBe('ob')
    expect(m.ob).toBe('ob')
  })

  test('observable', () => {
    let m = Model.create()
    const callback = sinon.spy()
    reaction(() => m.ob, () => {
      callback()
    })
    reaction(() => m.panel.sub, () => {
      callback()
    })

    expect(m.panel.sub === m.ob).toBeTruthy()
    expect(m.panel.sub).toEqual({ 'abc': '' })
    expect(callback.callCount).toBe(0)

    m.ob = [1, 2]
    expect(callback.callCount).toBe(2)
    expect(m.panel.sub === m.ob).toBeTruthy()
    // expect(m.panel.sub).toEqual([1, 2])

    m.panel.sub = [1, 2, 3]
    expect(m.panel.sub === m.ob).toBeTruthy()
    expect(callback.callCount).toBe(4)
  })
})
