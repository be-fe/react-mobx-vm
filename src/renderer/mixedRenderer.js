/**
 * @file mixedRenderer
 * @author Cuttle Cong
 * @date 2018/1/27
 * @description
 */
import r from './vmRender'
import h from './reactHyper'


/**
 * 即可以 render ViewModel 也可以 render React Component
 * r -> model, props = {}, ...children
 * h -> tagOrComp, classNameOrProps, props = undefined, ...content
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
