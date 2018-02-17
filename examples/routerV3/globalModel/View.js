/**
 * @file: View
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */

import React from 'react'
import { observable } from 'mobx'
import { Link } from 'react-router'
import { binding, h } from '../../../src'
import urlsync from '../../../src/decorator/urlSync/react'

@binding
export default class View extends React.Component {
  @urlsync('gV')
  @observable viewVal = 'gView'

  @urlsync
  @observable y = 'y'

  render() {
    const { children } = this.props
    return (
      <div>
        <header>
          <ul>
            <li>
              <Link id="to-A" to={'/'}>A</Link>
            </li>
            <li>
              <Link id="to-B" to={'/b'}>B</Link>
            </li>
          </ul>
        </header>
        <div>
          <h3>Global</h3>
          <label>gView</label>
          <input id="gView-input" data-bind="viewVal" data-scope={this} />
          <br/>
          <label>Y</label>
          <input id="gY-input" data-bind="y" data-scope={this} />
          <br/>
          <span name="gValue">{this.local.value}</span>
          <input data-bind="value" id="gValue-input"/>
        </div>
        <main>
          {children}
        </main>
      </div>
    )
  }
}
