---
title: "生命周期"
---

VM 将 React 视图和数据绑在一起，成为一个节点，同时提供 [`bindView`](../api/decorator.md#bindview) 和 [`stateInOut`](../api/decorator.md#stateinout) 方法，
来实现 View 的生命周期来触发 Model 中对应的方法。

其次，我们建议 Model 都继承 [`Root`](../api/others.md#root)， 是因为 Root 都预设了 `init/update/exit` 生命周期方法，而这些生命周期方法，
是 `urlSync/xxSync/autorun/reaction` 修饰器**生效的关键**。

同时我们也可以在 Model 的这些生命周期方法中去书写一些我们自己的逻辑，如可以在 `init` 中去做 fetch 操作等等。