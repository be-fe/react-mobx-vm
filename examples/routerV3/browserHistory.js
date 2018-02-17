/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { h, providerFactory, registerUrlSync } from '../../src'
import Router from '../../src/extension/RouterV3'
import app from './globalModel/async'
import { createHistory } from 'history'
import { useRouterHistory } from 'react-router'

const history = useRouterHistory(createHistory)({ basename: '/routerV3/browserHistory.js' })
registerUrlSync(history)

const Provider = providerFactory(app)

const routes = {
  path: '/',
  component: app,
  indexRoute: {
    // NOTE: `getComponent`
    getComponent: app.pageA
  },
  childRoutes: [
    {
      path: 'b',
      // NOTE: `getComponent`
      getComponent: app.pageB
    }
  ]
}

ReactDOM.render(
  <Provider>
    <Router routes={routes} history={history} />
  </Provider>,
  window.root
)


