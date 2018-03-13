---
title: binding的来由
order: .9
---

单向绑定非常简单，就是把Model绑定到View，当我们用JavaScript代码更新Model时，View就会自动更新。

有单向绑定，就有双向绑定。如果用户更新了View，Model的数据也自动被更新了，这种情况就是双向绑定。

什么情况下用户可以更新View呢？填写表单就是一个最直接的例子。当用户填写表单时，View的状态就被更新了，如果此时MVVM框架可以自动更新Model的状态，那就相当于我们把Model和View做了双向绑定：

<img src="https://i.loli.net/2018/03/13/5aa73406bca50.jpg" width="392" height="236"/>

在浏览器中，当用户修改了表单的内容时，我们绑定的Model会自动更新：

<img src="https://i.loli.net/2018/03/13/5aa7341151021.jpg" width="376" height="254"/>


下面介绍实现以上逻辑交互，不同的实现方式

## 原生React方式

```jsx
export default class Form extends Component {
    // 实际业务中，数据可能是来自props
    state = {
        name: '',
        email: ''
    }
    changeFromEvt = (key, evt) => {
        this.setState({
            [key]: evt.target.value
        })
    }

    render() {
        return (
            <form>
                <pre>{JSON.stringify(this.state)}</pre>
                <input
                    value={this.state.name}
                    onChange={this.changeFromEvt.bind(this, 'name')}
                />
                <input
                    type="email"
                    value={this.state.email}
                    onChange={this.changeFromEvt.bind(this, 'email')}
                />
            </form>
        )
    }
}
```

## Mobx（观察者）方式

```jsx
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class Form extends Component {
    @observable form = {
        name: '',
        email: ''
    }
    
    changeFromEvt = (key, evt) => {
        this.form[key] = evt.target.value
    }

    render() {
        return (
            <form>
                <pre>{JSON.stringify(this.form)}</pre>
                <input
                    value={this.name}
                    onChange={this.changeFromEvt.bind(this, 'name')}
                />
                <input
                    type="email"
                    value={this.email}
                    onChange={this.changeFromEvt.bind(this, 'email')}
                />
            </form>
        )
    }
}
```

## 双向绑定方式 (主角)

```jsx
import { observable, binding } from 'react-mobx-vm'

class Form {
    @observable name = ''
    @observable email = ''
}

const form = new Form()
@binding(form)
export default class FormView extends Component {
    render() {
        return (
            <form>
                <pre>{JSON.stringify(form)}</pre>
                <input
                    data-bind="name"
                />
                <input
                    type="email"
                    data-bind="email"
                />
            </form>
        )
    }
}
```

** 可以看到，binding大大缩小了我们的代码量。 **\
在这种比较简单的页面中体现不太明显，如果是大体量的表单页面，可以减去我们大量的重复代码。  
同时可以支持[自定义的双向绑定规则](./binding.md)
