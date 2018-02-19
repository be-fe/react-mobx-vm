/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { h, providerFactory, registerUrlSync } from '../../src'
import Router from '../../src/extension/RouterV3'
import app from './globalModel/sync'
import { hashHistory } from 'react-router'
registerUrlSync(hashHistory)
const Provider = providerFactory(app)

const routes = {
  path: '/',
  component: app,
  indexRoute: {
    component: app.pageA
  },
  childRoutes: [
    {
      path: 'b',
      component: app.pageB
    }
  ]
}

ReactDOM.render(
  <Provider>
    <Router routes={routes} history={hashHistory} />
  </Provider>,
  window.root
)


