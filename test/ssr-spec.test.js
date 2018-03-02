/**
 * @file ssr-spec
 * @author Cuttle Cong
 * @date 2018/3/2
 * @description
 */
import * as ReactServerDOM from 'react-dom/server'
import { bindView, h, binding, collect, Root, observable } from '../src'
import RouterV3 from '../srcPackages/RouterV3'
import RouterContext from '../srcPackages/RouterContextV3'
import * as React from 'react'
import { createMemoryHistory, match } from 'react-router'

describe('ssr-spec', function () {
  @binding
  class View extends React.Component {
    render() {
      return (
        <div>
          <input data-bind="val"/>
          <h1>{this.local.val}</h1>
          {this.props.children}
        </div>
      )
    }
  }

  @bindView(View)
  class App extends Root {
    @observable val = 'abc'
  }

  let AppVM, history
  beforeEach(function () {
    history = createMemoryHistory()
    const pageA = App.create({ val: 'pageAAsync' })
    const pageB = App.create({ val: 'pageBAsync' })
    AppVM = App.create({
      val: 'ooo',
      pageA: App.create({ val: 'pageA' }),
      pageB: App.create({ val: 'pageB' }),
      pageAAsync: () => new Promise(resolve => {
        resolve(pageA)
      }),
      pageBAsync: () => new Promise(resolve => {
        resolve(pageB)
      })
    })
  })
  test('ssr-spec basic', done => {
    expect(ReactServerDOM.renderToString(<AppVM/>))
      .toEqual(
        expect.stringContaining('<input value="ooo"/><h1>ooo</h1>')
      )
    done()
  })

  test('ssr-spec sync router', done => {
    const routes = {
      path: '/',
      component: AppVM,
      childRoutes: [
        {
          path: 'a',
          component: AppVM.pageA
        },
        {
          path: 'b',
          component: AppVM.pageB
        }
      ]
    }

    history.push('/a')
    expect(ReactServerDOM.renderToString(<RouterV3 history={history} routes={routes}/>))
      .toEqual(
        expect.stringContaining(
          '<input value="ooo"/><h1>ooo</h1>'
          + '<div><input value="pageA"/><h1>pageA</h1></div>'
        )
      )
    history.push('/b')
    expect(ReactServerDOM.renderToString(<RouterV3 history={history} routes={routes}/>))
      .toEqual(
        expect.stringContaining(
          '<input value="ooo"/><h1>ooo</h1>'
          + '<div><input value="pageB"/><h1>pageB</h1></div>'
        )
      )
    done()
  })

  test('ssr-spec async router', async done => {
    const routes = {
      path: '/',
      component: AppVM,
      childRoutes: [
        {
          path: 'a',
          getComponent: AppVM.pageAAsync
        },
        {
          path: 'b',
          getComponent: AppVM.pageBAsync
        }
      ]
    }

    match({ routes, location: '/a' }, (error, redirectLocation, renderProps) => {
      expect(ReactServerDOM.renderToString(
        <RouterContext
          {...renderProps}
        />
      ))
        .toEqual(
          expect.stringContaining(
            '<input value="ooo"/><h1>ooo</h1>'
            + '<div><input value="pageAAsync"/><h1>pageAAsync</h1></div>'
          )
        )
    })

    expect(typeof AppVM.pageBAsync).toBe('function')
    const ref = await collect(AppVM, 'pageBAsync')
    expect(AppVM).toBe(ref)
    expect(typeof AppVM.pageBAsync).toBe('object')
    expect(AppVM.pageBAsync instanceof App).toBe(true)

    AppVM.pageBAsync.val = 'overwrite'
    match({ routes, location: '/b' }, (error, redirectLocation, renderProps) => {
      expect(ReactServerDOM.renderToString(
        <RouterContext
          {...renderProps}
        />
      ))
        .toEqual(
          expect.stringContaining(
            '<input value="ooo"/><h1>ooo</h1>'
            + '<div><input value="overwrite"/><h1>overwrite</h1></div>'
          )
        )

      done()
    })
  })
})
