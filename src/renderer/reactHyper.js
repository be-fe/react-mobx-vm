/**
 * @file react-hyper
 * @author Cuttle Cong
 * @date 2018/2/13
 * @description
 */
import { createElement } from 'react'

const tags = [
  'div',
  'span',
  'a',
  'img',
  'pre',
  'br',
  'hr',

  // 标题
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',

  // 表格相关
  'table',
  'thead',
  'tbody',
  'th',
  'tr',
  'td',

  // 文档语义化
  'aside',
  'header',
  'footer',
  'section',
  'article',

  // 行内样式
  'em',
  'strong',

  // 不建议使用
  'i',
  'b',

  // 表单
  'label',
  'input',
  'button',
  'textarea',
  'p',
  'select',
  'option',
  'form',

  // 列表
  'ul',
  'ol',
  'li',

  // media
  'video',
  'audio',

  'iframe',
  'colgroup',
  'col',
  'area',
  'link'
]

export default function hyper(tagName, classNameOrProps, props, ...children) {
  if (typeof classNameOrProps === 'string') {
    props = props || {}
    props.className = props.className || classNameOrProps
    return createElement.apply(this, [tagName, props, ...children])
  }
  return createElement.apply(this, arguments)
}

tags.forEach(tag => {
  hyper[tag] = hyper.bind(null, tag)
})
