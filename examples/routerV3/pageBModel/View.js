/**
 * @file View
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */

import React from 'react'
import { binding, h, collect } from '../../../'

@binding
@collect('pageA')
export default class View extends React.Component {
  render() {
    return (
      <div>
        <h4 id="where">pageB</h4>
        <span name="bValue">{ this.local.value }</span>
        <input data-bind="value" id="bValue-input" />
        <br/>

        <span name="aValue">{ this.app.pageA.value }</span>
        <input data-bind="value" id="aValue-input" data-scope={this.app.pageA} />
        <br/>

      </div>
    )
  }
}
