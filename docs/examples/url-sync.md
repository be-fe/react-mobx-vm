---
title: urlSync
order: 1
---

### 简单例子
下面例子可编辑，尝试在下面的例子中的输入框输入，观察 URL 的改变；同时可以直接修改 URL 的部分，观察输入框值的变化

```jsx ?editable&placement=bottom
import * as React from 'react'
import { h, binding, observable, urlSync, providerFactory, registerUrlSync, bindView, Root } from 'react-mobx-vm'
import Router from 'react-mobx-vm/extension/RouterV3'
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

@bindView(Container)
class App extends Root {
  @urlSync('abc', { initialWrite: true })
  @observable g = 'g'
}

const AppVM = App.create({ g: 'hi' })
registerUrlSync(history)
export default <Router history={history} routes={{ path: '/', component: AppVM }}/>
```

---
