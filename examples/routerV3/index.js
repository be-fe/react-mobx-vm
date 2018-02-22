/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { h, providerFactory, registerUrlSync } from '../../dist/react-mobx-vm'
import Router from '../../srcPackages/RouterV3'
import app from './globalModel/async'
import { hashHistory } from 'react-router'
registerUrlSync(hashHistory)

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
    <Router routes={routes} history={hashHistory} />
  </Provider>,
  window.root
)


