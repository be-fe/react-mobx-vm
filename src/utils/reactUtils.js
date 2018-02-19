/**
 * @file reactUtils
 * @author Cuttle Cong
 * @date 2018/2/6
 * @description
 */
import * as React from 'react'

export const isValidElement = React.isValidElement

export function isComponentInstance(instance) {
  return instance && instance instanceof React.Component
}

// https://discuss.reactjs.org/t/how-to-determine-if-js-object-is-react-component/2825/5
export function isComponentClass(component) {
  return (
    component && component.prototype
    && component.prototype.isReactComponent
    && typeof component.prototype.isReactComponent === 'object'
    && !Array.isArray(component.prototype.isReactComponent)
  ) || (
    // legacy ?
    component && component.prototype
    && isComponentInstance(component.prototype)
  )
}

export function assertReactClass(Component, message) {
  if (!isComponentClass(Component)) {
    throw new Error(message + ' require ReactClass')
  }
}

/**
 * 转换 ReactElem
 * @param element
 * @param rules: [[cond, process]]
 * @param parent
 * @return element
 */
export function convertReactElement(element, rules = [], parent = null, outerIndex = 0) {
  if (!element || rules.length === 0) {
    return element
  }

  function convert(element, index, children) {
    rules.forEach(([cond, handle]) => {
      if (cond(element, index, parent, children)) {
        let handledElem
        // eslint-disable-next-line no-cond-assign
        if (
          typeof (
            handledElem = handle(element, index, parent, children)
          ) !== 'undefined'
        ) {
          element = handledElem
        }
      }
    })

    // @thinking return element ?
    return element
  }

  if (Array.isArray(element)) {
    return React
      .Children
      .toArray(element)
      .map((elem, index) => convertReactElement(elem, rules, parent, index))
  }
  let children = element && element.props && element.props.children
  let newElement = element
  newElement = convert(element, outerIndex, children)
  // convert may update children
  let newChildren = newElement && newElement.props && newElement.props.children
  if (newChildren) {
    newChildren = convertReactElement(newChildren, rules, newElement, outerIndex)
  }

  if (newElement === element && newChildren === children) {
    return element
  }

  return React.isValidElement(newElement)
    ? React.cloneElement(newElement, newElement.props, newChildren)
    : newElement
}

export function isElementOf(Component) {

  // Trying to solve the problem with 'children: XXX.isRequired'
  // (https://github.com/gaearon/react-hot-loader/issues/710). This does not work for me :(
  const originalPropTypes = Component.propTypes
  Component.propTypes = void 0

  // Well known workaround
  const elementType = React.createElement(Component).type

  // Restore originalPropTypes
  Component.propTypes = originalPropTypes

  return element => element && element.type === elementType
}

export function displayName(component) {
  return (
    component.displayName ||
    component.name ||
    (
      component.type && ( component.type.displayName || component.type.name )
    ) || 'Unknown'
  )
}
