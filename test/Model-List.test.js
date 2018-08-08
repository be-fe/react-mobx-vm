/**
 * @file Model-SymbolicLink
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import { List, Root, Piped, observable, h, bindView, stateless } from '../src/index'
import {
  reaction,
  runInAction,
  useStrict,
  isArrayLike,
  isObservableArray,
  isObservableObject
} from 'mobx'
import * as React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

useStrict(true)

describe('Model-List', function() {
  it('should List instanceof Root', function() {
    expect(List.create()).toBeInstanceOf(Root)
    // expect(List.create()).toBeInstanceOf(ObservableArray)
  })

  it('should ObservableArray works', function() {
    const list = List.create([1, 2, 3])
    const oList = observable.array([1, 2, 3])
    expect(list instanceof List)
    expect(isObservableArray(list)).toBeTruthy()
    expect(isObservableObject(oList)).toBeFalsy()
    expect(isObservableObject(list)).toBeFalsy()
    expect(isArrayLike(list)).toBeTruthy()

    expect(list.length).toBe(3)
    const callable = sinon.spy()
    reaction(() => list[0], callable)

    expect(callable.callCount).toBe(0)
    list.setValue(0, 1)
    expect(callable.callCount).toBe(0)
    list.setValue(0, '1')
    expect(callable.callCount).toBe(1)

    list.setValue(0, '12')
    expect(callable.callCount).toBe(2)
    expect(callable.calledWith('12')).toBe(true)
  })

  it('should assign works', function() {
    const list = List.create([1, 2, 3], Piped)

    expect(list.length).toBe(3)
    expect(list[0]).toBeInstanceOf(Piped)
    const callable = sinon.spy()
    reaction(() => list[0], callable)

    list.setValue(1, Piped.create())
    expect(callable.callCount).toBe(0)
    list.setValue(0, Piped.create())
    expect(callable.callCount).toBe(1)

    list.assign([{ a: '222' }])
    expect(callable.callCount).toBe(2)
    expect(list[0].a).toBe('222')
    expect(list[0]).toBeInstanceOf(Piped)

    runInAction(() => {
      list[0] = { a: '22' }
    })
    expect(callable.callCount).toBe(3)
    expect(list[0].a).toBe('22')
    expect(list[0] instanceof Piped).toBeFalsy()

    list.push({ b: 'xx' })
    let poped = runInAction(() => list.pop())
    expect(poped.b).toBe('xx')
    expect(poped).toBeInstanceOf(Piped)
    // expect(list).toEqual([{ a: '22' }])
  })

  it('should toJSON', function() {
    const o = Piped.create({})
    const list = List.create([{ a: 'xbb' }, o], Piped)

    const list3 = observable.array([Piped.create({ a: 'xbb' })])

    expect(typeof list3.includes).toBe('function')
    expect(typeof list.includes).toBe('function')

    expect(list.includes(o)).toBeTruthy()
    expect(list.indexOf(o)).toBe(1)

    // console.log(list.toJSON())
    // console.log(list.toJS())
    // console.log(list.slice())
  })

  it('should works on example', function() {
    class Model extends Root {
      @observable a = 'xyz'
      @observable b = 'abc'
    }

    const list = List.create([{ a: 'xbb' }, { b: 'hhh' }], Model)

    expect(
      list[0] instanceof Model === true && list[1] instanceof Model === true
    ).toBeTruthy()

    list.assign([{ a: 'xxx' }])
    expect(list[0] instanceof Model === true && list.length === 1).toBeTruthy()

    const list2 = List.create([], Model)
    list2.push({}, {})

    expect(
      list2[0] instanceof Model === true && list2[1] instanceof Model === true
    ).toBeTruthy()
  })

  it('should JSON stringify', function() {
    let m = List.create([])
    m.push({ hah: 'jkl' }, 22)
    m.unshift([1, 2])
    expect(JSON.stringify(m)).toBe(JSON.stringify([[1, 2], { hah: 'jkl' }, 22]))
    expect(m.length).toBe(3)
    expect(Array.from(m[0])).toEqual([1, 2])

    class Model extends Root {
      @observable name
      @observable age
      toJSON() {
        return {
          name: this.name
        }
      }
    }

    m = List.create([{ name: 'hh', age: 22 }], Model)
    m.push({ name: 'jkl' })
    expect(JSON.stringify(m)).toBe(
      JSON.stringify([{ name: 'hh' }, { name: 'jkl' }])
    )
    expect(m.length).toBe(2)
    expect(m[0].name).toBe('hh')
  })

  it('should View Modal of List works', () => {
    const View = stateless(local => (
      <div id="container">
        {
          local.map(({ title }, i) => <h3 key={i}>{ title }</h3>)
        }
      </div>
    ))

    class Model extends Root {
      @observable title = 'xyz'
    }

    @bindView(View)
    class ModelList extends List {
      constructor(list, Type) {
        super(list, Model)
      }
    }

    const list = ModelList.create([{ title: 'xbb' }, { title: 'hhh' }], Model)
    const wrapper = mount(h(list, {}))

    expect(wrapper.find('h3').length).toBe(2)
    expect(wrapper.find('h3').at(0).text()).toBe('xbb')
    expect(wrapper.find('h3').at(1).text()).toBe('hhh')

    runInAction(() => list[0].title = 'changed')
    expect(wrapper.find('h3').at(0).text()).toBe('changed')
  })
})
