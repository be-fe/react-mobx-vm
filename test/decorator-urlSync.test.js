/**
 * @file decorator-urlSync
 * @author Cuttle Cong
 * @date 2018/3/9
 * @description
 */
import { urlSync, registerUrlSync, bindView } from '../src/decorator'
import { observable } from 'mobx'
import h from '../src/renderer/mixedRenderer'
import { Root } from '../src/Model'
import RouterV3 from '../srcPackages/RouterV3'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { stringify as oStringify, parse as oParse } from 'qs'

function stringify(obj) {
  return '?' + oStringify(obj)
}

const mockDelay = () => new Promise(resolve => {
  setTimeout(resolve, 500)
})

function parse(string = '') {
  string = string.trim()
  if (string.startsWith('?')) {
    string = string.substring(1)
  }
  return oParse(string)
}

describe('decorator-urlSync', function () {
  let vm, dom

  class View extends React.Component {
    render() {
      return null
    }
  }

  @bindView(View)
  class App extends Root {
    @urlSync
    str = 'str'
    @urlSync
    num = 1.23
    @urlSync
    int = 4
    @urlSync
    obj = {
      val: 'val',
      arr: [1, 2, '45'],
      o: {
        a: 'a'
      }
    }

    @urlSync
    @observable arr = [{ a: 'a' }, 'b']

    @urlSync
    @observable
    root = Root.create({
      ra: { a: 'ra' },
      va: [{ a: 'ra' }],
      str: 'str'
    })
  }

  beforeEach(() => {
    dom = document.createElement('div')
    registerUrlSync(hashHistory)
    hashHistory.push({
      path: '/',
      search: '',
      query: null
    })
  })
  test('decorator-urlSync simple', async (done) => {
    class Simple extends App {
      init() {
        expect(hashHistory.getCurrentLocation().search)
          .toEqual(
            expect.stringContaining(stringify({
              int: 5,
              num: 1.23,
              str: 'xxx'
            }))
          )
      }
    }

    vm = Simple.create()
    let root = vm.root
    let arr = vm.arr
    let obj = vm.obj
    expect(vm.toJSON().root instanceof Root).toBe(false)
    expect(root).toBe(vm.root)
    hashHistory.push({
      pathname: '/',
      query: null,
      search: stringify({
        int: 5,
        num: 1.23,
        str: 'xxx',
        arr: [{ a: 'abc' }]
      })
    })

    ReactDOM.render(
      <RouterV3 history={hashHistory} routes={{ path: '/', component: vm }}/>,
      dom
    )
    await mockDelay()
    expect(vm.int).toBe(5)
    expect(vm.num).toBe(1.23)
    expect(vm.num).not.toBe('1.23')
    expect(vm.str).toBe('xxx')
    expect(vm.arr instanceof Array).toBeTruthy()
    expect(
      JSON.stringify(vm.arr)
    ).toEqual(
      JSON.stringify([{ a: 'abc' }])
    )
    expect(vm.arr.length).toBe(1)
    expect(vm.arr).toBe(arr)


    hashHistory.push({
      pathname: '/',
      query: null,
      search: stringify({
        arr: [{ b: 'c' }, 4],
        root: {
          str: 'rootStr'
        }
      })
    })
    await mockDelay()
    expect(
      JSON.stringify(vm.arr)
    ).toEqual(
      JSON.stringify([{ a: 'abc', b: 'c' }, '4'])
    )
    expect(vm.arr).toBe(arr)
    expect(vm.root).toBe(root)
    expect(root.str).toBe('rootStr')
    expect(vm.root).toEqual({
      ra: { a: 'ra' },
      va: [{ a: 'ra' }],
      str: 'rootStr'
    })
    done()
  })

  // https://github.com/mobxjs/mobx/issues/1382
  test('extends and observable', async (done) => {
    class P extends App {
      @urlSync
      @observable a = 'x';
      @urlSync
      @observable b = 'y'

      @urlSync('i')
      @observable int = 23

      @urlSync('pArr')
      @observable arr = ['1', '2']

      @observable v = 'pv'
    }

    class S extends P {
      @urlSync('xx')
      @observable a = 's';
      @urlSync('yy')
      @observable b = 't'
      @urlSync('ii')
      @observable int = 222
      @urlSync('s')
      @observable str = 't'

      @observable v = 'sv'
    }

    expect(new S().v).toBe('sv')

    // expect(
    //   Object.keys(s['__[[urlsync_origin_hooks]]__'])
    // ).toEqual(
    //   ['str', 'num', 'int', 'obj', 'arr', 'root', 'a', 'b']
    // )
    vm = S.create({ a: 'abc', b: 'bbb' })
    ReactDOM.render(
      <RouterV3 history={hashHistory} routes={{ path: '/', component: vm }}/>,
      dom
    )
    await mockDelay()
    expect(
      parse(hashHistory.getCurrentLocation().search)
    ).toEqual({})

    vm.a = 'update'
    vm.b = 'updateB'
    vm.str = 's'
    vm.num = 234
    vm.int = 22222
    await mockDelay()
    expect(
      parse(hashHistory.getCurrentLocation().search)
    ).toEqual({
      ii: '22222',
      num: '234',
      s: 's',
      xx: 'update',
      yy: 'updateB'
    })
    done()
  })
})
