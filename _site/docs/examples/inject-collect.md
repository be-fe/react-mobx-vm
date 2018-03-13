---
title: inject & collect
order: 1
---

inject & collect 主要是用来获取全局 store 实例，进而进行页面之间的数据通信。

collect 适用于获取挂载在全局 store 中懒加载的 VM。

### 简单例子
使用 `inject` 在 View 层注入全局的数据

```jsx ?editable&placement=bottom
import * as React from 'react'
import { h, binding, inject, observable, providerFactory, bindView, Root } from 'react-mobx-vm'
import Router from 'react-mobx-vm/packages/RouterV3'
import { hashHistory, createMemoryHistory, useRouterHistory } from 'react-router'

const history = typeof document === 'undefined' ? useRouterHistory(createMemoryHistory)() : hashHistory

const Container = binding(
  ({ children }) => (
    <div>
      <input data-bind="g" />
      {children}
    </div>
  )
)

@binding
@inject
class EditView extends React.Component {
  render() {
    return (
      <div>
        <p>this.app === appVM: {(this.app === appVM).toString()}</p>
        <p>this.app.editVM === this.local: {(this.app.editVM === this.local).toString()}</p>
        <input data-bind="g" data-scope={this.app} />
        <p>Edit View</p>
        <input data-bind="val" />
      </div>
    )
  }
}

@bindView(EditView)
class EditModel extends Root {
  @observable val = 'abc'
}

@bindView(Container)
class App extends Root {
  editVM = EditModel.create()
  @observable g = 'g'
}

const appVM = App.create({ g: 'hi' })
const Provider = providerFactory(appVM)
const routes = {
  path: '/', component: appVM,
  indexRoute: {
    component: appVM.editVM
  }
}

export default (
  <Provider>
    <Router history={history} routes={routes}/>
  </Provider>
)
```

---
