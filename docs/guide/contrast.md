---
title: "对比于 Redux 和 Mobx State Tree"
---

以一个简单的 TodoList 应用为例，分别使用 [Mobx State Tree](https://github.com/mobxjs/mobx-state-tree) 和 React Mobx VM 来实现一下，这样对比起来更明显

<toc>

---

## MST TodoList

如需实现如下一个简单的 TodoList 应用，使用 MST（Mobx State Tree）应该如何书写呢？

- index.js
```jsx?editable&placement=top
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { render } from 'react-dom'

import { TodoStore } from '../snippets/mst/models/TodoStore'
import { TodoList } from '../snippets/mst/components/TodoList'
// 注意：该以下代码可同步编辑
const store = TodoStore.create({
  todos: [
    {
      title: 'Get Coffee'
    },
    {
      title: 'Write simpler code'
    }
  ]
})

export default <TodoList todoStore={store}/>
```

```javascript
@../snippets/mst/models/TodoStore@
```

- ../snippets/mst/components/TodoList.js
```javascript
@../snippets/mst/components/TodoList@
```

- ../snippets/mst/components/Todo.js
```javascript
@../snippets/mst/components/Todo@
```

## VM TodoList

- index.js
```jsx?editable&placement=top
import ReactDOM from 'react-dom'
import { h } from 'react-mobx-vm'

import TodoList from '../snippets/vm/TodoList'
import Todo from '../snippets/vm/Todo'
// 注意：该以下代码可同步编辑
const App = TodoList.create({
  todos: [
    Todo.create({
      title: 'Get Coffee'
    }),
    Todo.create({
      title: 'Write simpler code'
    })
  ]
})

export default h(App)
```

- ../snippets/vm/TodoList/index.js
```javascript
@../snippets/vm/TodoList@
```

- ../snippets/vm/TodoList/View.js
```javascript
@../snippets/vm/TodoList/View@
```

- ../snippets/vm/Todo/index.js
```javascript
@../snippets/vm/Todo@
```

- ../snippets/vm/Todo/View.js
```javascript
@../snippets/vm/Todo/View@
```
