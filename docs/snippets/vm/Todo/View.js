import {
  stateless
} from 'react-mobx-vm'
import * as React from 'react'

export default stateless(local =>
  <li>
    <input
      type="checkbox"
      checked={local.finished}
      onClick={local.toggle.bind(local)}
    />
    {local.title}
  </li>
)

