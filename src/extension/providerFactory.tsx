/**
 * @file Provider
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */
import * as React from 'react'
import { Provider } from 'mobx-react'
import Root from '../Model/Root'

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
type Props = { children?: any }
export default (app: any) => ({ children, ...props }: Props) =>
  React.createElement(
    Provider,
    {
      ...props,
      app
    },
    children
  )
