/**
 * @file: Provider
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */
import React from 'react'
import { Provider as OProvider } from 'mobx-react'

export default app =>
  function Provider({ children, ...props }) {
    return React
      .createElement(
        OProvider, {
          ...props,
          app
        },
        children
      )
  }
