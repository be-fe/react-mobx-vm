/**
 * @file: View
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */

import React from 'react'
import { binding, h } from '../../../src'

@binding
export default class View extends React.Component {
  render() {
    return (
      <div>
        <h4 id="where">pageA</h4>
        <span name="aValue">{ this.local.value }</span>
        <input data-bind="value" id="aValue-input" />
        <br/>

        <span name="pageTotal">{ this.local.page.total }</span>
        <input data-bind="page.total" id="pageTotal" />
        <br/>

        <span name="pageSize">{ this.local.page.size }</span>
        <input data-bind="page.size" id="pageSize" />
        <br/>

        <span name="pageNumber">{ this.local.page.number }</span>
        <input data-bind="page.number" id="pageNumber" />
        <br/>

      </div>
    )
  }
}
