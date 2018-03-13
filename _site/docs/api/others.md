---
title: 其他相关
---

<toc>
---

# Model

<<EXEC doc.js  src/Model/index.js>>

# Renderer
`React.createElement` 是不能渲染一个 ViewModel 实例的，
于是便提供了渲染方法来渲染 vm。

<<EXEC doc.js  src/renderer/**/*.js -s>>

# Extension
一些额外的扩展

<<EXEC doc.js  src/extension/**/*.js -s>>

<<EXEC doc.js  srcPackages/**/*.js -s>>
