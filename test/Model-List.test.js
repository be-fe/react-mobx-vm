/**
 * @file Model-SymbolicLink
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import { List, Root, Piped, observable } from '../src/index'
import {
  reaction,
  runInAction,
  useStrict,
  isArrayLike,
  isObservableArray,
  isObservableObject
} from 'mobx'
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

    list.add({ b: 'xx' })
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
    list2.add({}, {})

    expect(
      list2[0] instanceof Model === true
      && list2[1] instanceof Model === true
    ).toBeTruthy()
  })
})
