/**
 * @file Provider
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */
import * as React from 'react'
import { Provider as OProvider } from 'mobx-react'

/**
 * 用于产生一个 Provider，传入一个全局的 store
 * @public
 * @name providerFactory
 * @example
 * const app = AppVM.create()
 * const Provider = providerFactory(app)
 * 
 * ReactDOM.render(
 *    <Provider>
 *      {...}
 *    </Provider>,
 *    window.root
 * )
 */
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
