/**
 * @file Model-SymbolicLink
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import {
  SymbolicLink,
  symbolicLink,
  SymbolicCustom,
  Symbolic,
  observable,
  Root
} from '../src/index'
import { reaction, runInAction, useStrict } from 'mobx'
import sinon from 'sinon'

useStrict(true)

describe('Model-SymbolicLink', function() {
  class Panel extends SymbolicLink {
    @observable title = '123'
    @observable sub = {}
    @observable
    deep = {
      ref: 1
    }
    @observable ob = 'xx'
    @observable isOpen = true
  }

  class Model extends SymbolicLink {
    title = 'modelTitle'
    /*@observable*/
    panel = Panel.create()
      .setSymbolic('title', Symbolic(this, 'title'))
      .setSymbolic('sub', Symbolic(this, 'ob'))
      .setSymbolic('deep.ref', Symbolic(this, 'panelRef.ref'))
      .setSymbolic(
        'isOpen',
        SymbolicCustom({
          get() {
            return 'fixed'
          }
        })
      )

    @observable
    panelRef = {
      ref: 'panelRef'
    }
    @observable ob = { abc: '' }
  }

  class ModelB extends SymbolicLink {
    title = 'modelTitle'
    @observable
    panelRef = {
      ref: 'panelRef'
    }
    @observable ob = { abc: '' }
    @observable
    panel = Panel.create()
      .setSymbolic('title', Symbolic(this, 'title'))
      .setSymbolic('sub', Symbolic(this, 'ob'))
      .setSymbolic('deep.ref', Symbolic(this, 'panelRef.ref'))
      .setSymbolic(
        'isOpen',
        SymbolicCustom({
          get() {
            return 'fixed'
          }
        })
      )
  }

  test('Model-SymbolicLink specB', () => {
    let m = ModelB.create()

    expect(m.ob).toEqual({ abc: '' })
    expect(m.panel.title).toBe('modelTitle')
    expect(m.title).toBe('modelTitle')

    expect(m.panelRef.ref).toBe('panelRef')
    expect(m.panel.deep.ref).toBe('panelRef')

    m.panel.title = 'title'
    expect(m.title).toBe('title')
    expect(m.panel.title).toBe('title')
  })

  test('Model-SymbolicLink spec', () => {
    let m = Model.create()

    expect(m.ob).toEqual({ abc: '' })
    expect(m.panel.title).toBe('modelTitle')
    expect(m.title).toBe('modelTitle')

    expect(m.panelRef.ref).toBe('panelRef')
    expect(m.panel.deep.ref).toBe('panelRef')

    m.panel.title = 'title'
    expect(m.title).toBe('title')
    expect(m.panel.title).toBe('title')
  })

  test('Model-SymbolicLink setSymbolic', () => {
    let m = Model.create()

    runInAction(() => (m.panel.title = 'title'))
    expect(m.panel.isOpen).toBe('fixed')
    runInAction(() => (m.panel.isOpen = 'abcc'))
    expect(m.panel.isOpen).toBe('fixed')

    expect(m.title).toBe('title')
    expect(m.panel.title).toBe('title')

    const oldObVal = m.ob
    m.panel.setSymbolic('title', Symbolic(m, 'ob'))

    expect(m.panel.title).toBe(oldObVal)
    expect(m.ob).toBe(oldObVal)
    // set undefined
    m.panel.setValue('title')
    expect(m.panel.title).toBeUndefined()
    expect(m.ob).toBeUndefined()

    runInAction(() => (m.ob = 'ob'))
    expect(m.panel.title).toBe('ob')
    expect(m.ob).toBe('ob')
  })

  test('observable', () => {
    let m = Model.create()
    const callback = sinon.spy()
    reaction(
      () => m.ob,
      () => {
        callback()
      }
    )
    reaction(
      () => m.panel.sub,
      () => {
        callback()
      }
    )

    expect(m.panel.sub === m.ob).toBeTruthy()
    expect(m.panel.sub).toEqual({ abc: '' })
    expect(callback.callCount).toBe(0)

    runInAction(() => (m.ob = [1, 2]))
    expect(callback.callCount).toBe(2)
    expect(m.panel.sub === m.ob).toBeTruthy()
    // expect(m.panel.sub).toEqual([1, 2])

    runInAction(() => (m.panel.sub = [1, 2, 3]))
    expect(m.panel.sub === m.ob).toBeTruthy()
    expect(callback.callCount).toBe(4)
  })

  test('symbolicLink', () => {
    let host = { a: 'a', aa: 'aa', b: { c: 'host.b.c' } }
    const proxy = { a: 'x', aa: 'proxyAA', b: { c: 'proxy' } }
    host = symbolicLink(host, {
      a: Symbolic(proxy, 'a'),
      cus: SymbolicCustom({
        value: '222',
        writable: true
      })
    })
    expect(host.a).toBe('x')
    expect(host.b.c).toBe('host.b.c')
    expect(host.cus).toBe('222')
    host.cus = 456
    expect(host.cus).toBe(456)

    host = symbolicLink(host, {
      'b.c': Symbolic(proxy, 'b.c')
    })
    expect(host.b.c).toBe('proxy')

    expect(() => {
      symbolicLink(host, {
        a: {}
      })
    }).toThrow()

    expect(host.aa).toBe('aa')
    host = symbolicLink(host, {
      aa: Symbolic(proxy, 'aa')
    })
    expect(host.aa).toBe('proxyAA')
  })

  test('deep nested symbolicLink', () => {
    class Tree extends Root {
      @observable id = 'root'

      @observable
      left = symbolicLink(
        Node.create({ id: 'left', left: null }), {
          id: Symbolic(this, 'id')
        }
      )
    }

    class Node extends Root {
      @observable id = 'node'

      @observable
      left = symbolicLink(
        Leaf.create(), {
          id: Symbolic(this, 'id')
        }
      )
    }

    class Leaf extends Root {
      @observable id = 'leaf'
    }


    expect(Tree.create({ id: 'node' }).id).toBe('node')
    expect(Tree.create({ id: 'node' }).left.id).toBe('node')
    expect(Tree.create({ id: 'node' }).left.left.id).toBe('node')
  })
})
