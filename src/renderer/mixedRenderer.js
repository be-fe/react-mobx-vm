/**
 * @file mixedRenderer
 * @author Cuttle Cong
 * @date 2018/1/27
 * @description
 */
import r from './vmRender'
import h from './reactHyper'


/**
 * `React.createElement` 是不能渲染一个 ViewModel 实例的，于是便提供了渲染方法来渲染 vm。
 *
 * 即可以 render ViewModel 也可以 render React Component
 * r -> model, props = {}, ...children
 * h -> tagOrComp, classNameOrProps, props = undefined, ...content
 */
/**
 *
 * 可以渲染 Vm 实例的方法，类似于 `React.createElement`
 * @name h
 * @public
 * @param {VmInstance | ReactComponent | string} model
 * @param {string | object} [propsOrClassName={}]
 * @param {object} [props=null]
 * @param {....ReactElement} [children=[]]
 * @returns {ReactElement}
 * @example
 * h(model, 'class-name', {},
 *  // children
 *  '1', '2'
 * );
 * h.div({}, 'inner')
 * h('div', {}, 'inner')
 * h('div', 'classname', {}, 'inner')
 * h(Component, 'classname', {},
 *    h.span()
 * )
 */
function mixedRenderer(model, propsOrClassName, props, ...children) {
  if (model && typeof model === 'object') {
    if (typeof propsOrClassName === 'string') {
      propsOrClassName = { className: propsOrClassName }
      props = props || {}
      props = { ...props, ...propsOrClassName }
    }
    else {
      children = [props].concat(children)
      props = propsOrClassName
    }
    return r.apply(this, [model, props, ...children])
  }
  return h.apply(this, arguments)
}

Object.assign(mixedRenderer, h)

export default mixedRenderer
