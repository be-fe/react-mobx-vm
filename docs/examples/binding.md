---
title: binding
order: 1
---

<toc>

---
### 简单例子
下面例子可编辑

```jsx ?editable&placement=bottom
import * as React from 'react'
import { h, binding, observable } from 'react-mobx-vm'

class Scope {
  @observable inputList = ['abc', 'def']
}
const scope = new Scope()

@binding
export default class View extends React.Component {
    render() {
        return (
          <div>
          {
            scope.inputList.map(
              (input, i) => 
                <input key={i} data-bind={i} data-scope={scope.inputList} />
            )
          }
          </div>
        )
    }
}
```


---

### Bindable 例子
下面例子可编辑

```jsx ?editable&placemen=bottom
import {
  h,
  binding,
  Root,
  bindView,
  bindable,
  observable,
  DEFAULT_OPTIONS
} from 'react-mobx-vm'

bindable([{
  cond: function (props) {
    return props.type === 'checkbox'
  },
  prop: [
    ['checked', function (modelValue, propVal, props) {
      return modelValue.includes(props.name)
    }]
  ],
  event: [
    ['onChange', function (evt, ctx) {
      const { target: { name, checked } } = evt
      const list = ctx.get()
      let i = list.indexOf(name)
      i >= 0 && list.splice(i, 1)
      if (checked) {
        list.push(name)
      }
    }]
  ]
  // 需要拼接上 DEFAULT_OPTIONS，这样才能保证 input[type=text] 可以正常binding
}].concat(DEFAULT_OPTIONS), 'input')

/* 这里为单向绑定，只有数据的输入 */
const JSONView = bindable({
  prop: ['json']
}, ({ json }) => <pre><code>{JSON.stringify(json, null, 2)}</code></pre>)

@binding
class View extends React.Component {
  render() {
    return (
      <div>
        <input type="text" id="text" data-bind="value" />
        <br/>
        <input id="test" data-bind="value"/>
        <br/>
        <JSONView data-bind="checkedList" />
        <input type="checkbox" id="a_0" data-bind="checkedList" name={'a'}/>
        <input type="checkbox" id="a_1" data-bind="checkedList" name={'a'}/>
        <input type="checkbox" id="b_0" data-bind="checkedList" name={'b'}/>
      </div>
    )
  }
}

@bindView(View)
class Scope extends Root {
  @observable value = 'val'
  @observable checkedList = []
}
const scope = Scope.create({ value: 'hhh', checkedList: ['b'] })

export default h(scope)
```