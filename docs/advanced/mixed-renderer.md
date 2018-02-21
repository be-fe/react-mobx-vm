---
title: "怎么用 JSX 渲染 VM？"
---

如果直接写 JSX 来渲染 VM 是会出错的，因为 JSX 语法会被解析成 `React.createElement`，这就是为什么我们在使用 JSX 的时候，必须要 import React。

```js
<h1>hi</h1>
// ->
React.createElement('h1', null, 'h1')
```

而这个转换是由 babel 来完成的，只需要修改 `babel-plugin-transform-react-jsx` 的配置即可，当然需要先安装它啦。

```js
"plugins": [
  [
    "transform-react-jsx", {
      "pragma": "h"
    }
  ]
]
```

这样，JSX 就会转换过程如下：
```js
<h1>hi</h1>
// ->
h('h1', null, 'h1')
```

于是我们可以直接用 JSX 来渲染 VM
```js
const VM = Model.create()
render(<VM />)

// 注意：下面会有错
// 因为 transform-react-jsx 认为小写字母开头的标志符表示为HTML标签
const vm = Model.create()
render(<vm />) // -> h('vm', null)
```

综合上面的原因，我们建议还是直接使用 [`h`](../api/others.md#h) 方法来渲染 VM 更为方便。