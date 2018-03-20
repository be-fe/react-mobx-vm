/**
 * @file Model.test
 * @author Cuttle Cong
 * @date 2018/2/14
 * @description $END$
 */
import React from 'react'
import { mount } from 'enzyme'
import { observable } from 'mobx'
import { extendObservable, isObservable } from 'mobx'
import sinon from 'sinon'

import { Root, Piped } from '../src/Model'
import bindView, { getView } from '../src/decorator/bindView'
import h from '../src/renderer/mixedRenderer'

describe('Model.basic', function () {
  test('pure Model', () => {
    expect(new Piped() instanceof Root).toBeTruthy()
    expect(Piped.prototype instanceof Root).toBeTruthy()

    expect(new Piped().viewId !== new Piped().viewId).toBeTruthy()
    expect(new Piped().viewId + 1 === new Piped().viewId).toBeTruthy()
    expect(new Piped().toJSON()).toEqual({})

    const root = new Piped({ data: { a: '123' } })
    expect(root.data).toEqual({ a: '123' })
    root.assign({ data: 'cuttle' })
    expect(root.data).toBe('cuttle')

    const data = { a: {}, b: [1, 2] }
    root.assign(data)
    expect(root.a === data.a).toBeTruthy()
    expect(root.b === data.b).toBeTruthy()
    root.assignDeep(data)
    expect(root.a === data.a).toBeFalsy()
    expect(root.b === data.a).toBeFalsy()

    expect(root.toJSON()).toEqual({
      ...data,
      data: 'cuttle'
    })

    expect(root.isEmpty()).toBeFalsy()
    const nested = new Root({
      root: new Root({ s: 'ss' }).setValue(['s'], ''),
      arr: [],
      o: {}
    })
    expect(nested.isEmpty()).toBeTruthy()
    expect(nested.clone() === nested).toBeFalsy()
    expect(nested.clone().isEmpty()).toBeTruthy()
    expect(nested.clone().isEqual(nested)).toBeTruthy()
    expect(nested.clone().isEqual(nested.toJSON())).toBeTruthy()
    expect(nested.toJSON()).toEqual({
      arr: [], o: {}, root: { s: '' }
    })
  })

  test('extended Model', () => {
    class Person extends Root {
      constructor(props) {
        super(props)
        this.assign({
          name: 'cuttle',
          age: 20,
          ...props
        })
      }
    }

    expect(new Person().name).toBe('cuttle')
    expect(new Person({ name: 'CUTTLE' }).name).toBe('CUTTLE')
    expect(new Person().assign).toBe(new Root().assign)
    expect(typeof Person.create).toBe('function')
    expect(Person.create({ name: 'create' }) instanceof Person).toBe(true)

    class Special extends Root {
      name = 'ques'
      @observable abc = 'jkl'
    }
    expect(new Special({ name: 'abc' }).name).toBe('ques')
    expect(new Special({ abc: 'abc' }).abc).toBe('abc')
    expect(Special.create({ abc: 'abc' }).abc).toBe('abc')
    expect(Special.create({ name: 'abc' }).name).toBe('abc')
    // console.log(Special.prototype)
    // console.log(Special.__proto__)
  })

})


describe('Model.lifeCycle', () => {
  test('View Model', () => {
    class View extends React.Component {
      componentWillMount() {}
      render() {
        return (
          <h1 className={this.props.className}>{ this.local.name }</h1>
        )
      }
    }

    @bindView(View)
    class Model extends Piped {
      name = 'modelName'
    }
    const willMount = sinon.spy(getView(Model).prototype, 'componentWillMount')
    const didMount = sinon.spy(getView(Model).prototype, 'componentDidMount')
    const didUpdate = sinon.spy(getView(Model).prototype, 'componentDidUpdate')
    const unMount = sinon.spy(getView(Model).prototype, 'componentWillUnmount')
    const receiveProps = sinon.spy(getView(Model).prototype, 'componentWillReceiveProps')
    const viewUnMount = sinon.spy(View.prototype, 'componentWillUnmount')

    const init = sinon.spy(Model.prototype, 'init')
    const update = sinon.spy(Model.prototype, 'update')
    const exit = sinon.spy(Model.prototype, 'exit')

    const VM = new Model
    const dom = mount(<VM className="vm-classname"/>)
    expect(dom.html()).toBe('<h1 class="vm-classname">modelName</h1>')
    expect(dom.render().attr('class')).toBe('vm-classname')
    expect(dom.instance().local).toBe(dom.prop('local'))
    expect(dom.instance().local.className).toBe('vm-classname')
    expect(init).toBe(VM.init)
    // will -> did -> init
    expect(willMount.calledImmediatelyBefore(didMount)).toBeTruthy()
    expect(didMount.calledImmediatelyBefore(init)).toBeTruthy()
    expect(willMount.calledBefore(init)).toBeTruthy()

    expect(init.calledOnce).toBeTruthy()
    expect(init.calledOn(VM)).toBeTruthy()

    VM.name = 'change me'

    dom.unmount()
    expect(exit.callCount).toBe(1)
    expect(unMount.callCount).toBe(1)
    expect(unMount.calledImmediatelyBefore(exit)).toBe(true)
    expect(exit.calledImmediatelyBefore(viewUnMount)).toBe(true)

    extendObservable(VM, {
      name: 'observable'
    })
    // don't tracked
    expect(VM.name).toBe('observable')
    expect(isObservable(VM, 'name')).toBe(true)
    // Tracked
    const otherDom = mount(<VM/>)
    expect(otherDom.text()).toBe('observable')
    VM.name = '123'
    expect(otherDom.text()).toBe('123')

    VM.name = '123'
    expect(didUpdate.callCount).toBe(1)
    VM.name = '1234'
    expect(didUpdate.callCount).toBe(2)

    otherDom.setProps({ a: 'b' })
    expect(receiveProps.calledOnce).toBeTruthy()
    expect(update.calledOnceWith(sinon.match({ a: 'b' }))).toBeTruthy()
    expect(receiveProps.calledImmediatelyBefore(update)).toBeTruthy()
  })

  test('View Model reference updated', () => {
    class SimpleView extends React.Component {
      render() {
        return <h3>Simple{this.local.ob}</h3>
      }
    }

    @bindView(SimpleView)
    class SimpleModel extends Root {
      @observable ob = ''
    }

    class View extends React.Component {
      componentWillMount() {}
      render() {
        return (
          <h1 className={this.props.className}>
            { this.local.name }
            <span>
              {h(this.local.VM)}
            </span>
          </h1>
        )
      }
    }

    @bindView(View)
    class Model extends Root {
      name = 'name'
      VM = new SimpleModel
      updateVM(name) {
        this.VM.ob = name
      }
    }


    const init = sinon.spy(SimpleModel.prototype, 'init')
    const update = sinon.spy(SimpleModel.prototype, 'update')
    const exit = sinon.spy(SimpleModel.prototype, 'exit')

    const host = new Model()
    const dom = mount(h(host))
    expect(init.callCount).toBe(1)
    dom.setProps({ className: 'hhh' })
    expect(init.callCount).toBe(1)
    expect(update.callCount).toBe(1)

    dom.setProps({ className: 'xhhh' })
    expect(update.callCount).toBe(2)
    expect(init.callCount).toBe(1)
    expect(exit.callCount).toBe(0)

    host.updateVM('abc')
    expect(host.VM.ob).toBe('abc')
    expect(dom.find('h3').text()).toBe('Simpleabc')
    expect(update.callCount).toBe(2)
    expect(exit.callCount).toBe(0)
    expect(init.callCount).toBe(1)

    // don't trigger update
    host.VM = new SimpleModel()
    host.updateVM('')
    expect(host.VM.ob).toBe('')
    expect(dom.find('h3').text()).toBe('Simpleabc')
    expect(exit.callCount).toBe(0)
    // update manually
    dom.setProps({ className: 'abc-class' })
    expect(dom.find('h3').text()).toBe('Simple')
    expect(update.callCount).toBe(2)
    expect(exit.callCount).toBe(1)
    expect(init.callCount).toBe(2)
  })

  test('assignShallow nested Root instance', () => {
    class Bar extends Root {
      val = 'val'
    }
    class Person extends Bar {
      bar = new Bar
    }
    class Nested extends Root {
      person = new Person()
    }

    const nested = Nested.create({ person: { bar: { val: 'abc' } } })
    expect(nested.person instanceof Person).toBe(true)
    expect(nested.person instanceof Root).toBe(true)
    expect(nested.person.val).toBe('val')
    expect(nested.person.bar.val).toBe('abc')
    expect(nested.person.bar instanceof Bar).toBe(true)
  })

  test('toJSON nested Root instance', () => {
    class Bar extends Root {
      val = 'val'
    }
    class Person extends Root {
      bar = new Bar
    }
    class Nested extends Root {
      person = new Person()
    }

    const nested = Nested.create({ person: { bar: { val: 'abc' } } })
    expect(nested.toJSON()).toEqual({
      person: {
        bar: { val: 'abc' }
      }
    })

  })

  test('toJSON customized nested', () => {
    class Bar extends Root {
      val = 'val'
      toJSON() {
        return ['bar']
      }
    }
    class Person extends Root {
      bar = new Bar
    }
    class Nested extends Root {
      person = new Person()
    }
    const nested = Nested.create({ person: { bar: { val: 'abc' } } })
    expect(nested.toJSON()).toEqual({
      person: {
        bar: ['bar']
      }
    })
  })
})
