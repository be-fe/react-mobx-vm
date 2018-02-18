/**
 * @file: collect
 * @author: Cuttle Cong
 * @date: 2018/1/28
 * @description:
 */
import { action, isObservable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import _ from 'lodash'
import { getHandledProps } from './bindable'
import { convertReactElement, displayName, isComponentClass } from '../../utils/reactUtils'

function convert(element, fallbackScope) {
  return convertReactElement(element, [
    [
      function cond(elem) {
        return elem && elem.props && elem.props['data-bind']
      },
      (elem) => {
        let bind = elem.props['data-bind']
        const dataScope = elem.props['data-scope'] || fallbackScope
        if (process.env.NODE_ENV !== 'production' && !isObservable(dataScope)) {
          console.warn('[Warning] the scope of binding isn\'t observable.', dataScope)
        }

        if (!dataScope) {
          throw new Error('binding convert require data-scope, but ' + dataScope)
        }

        // dynamic bind
        if (typeof bind === 'function') {
          bind = bind(dataScope).toString()
        }

        const get = function () {
          return _.get(dataScope, bind)
        }
        const set = action(function (val) {
          _.set(dataScope, bind, val)
        })
        const ctx = {
          get,
          set,
          scope: dataScope,
          bind
        }

        if (
          typeof bind === 'string' && _.hasIn(dataScope, bind)
          || typeof bind === 'function'
        ) {
          const handledProps = getHandledProps(ctx, elem, elem.props)
          const newProps = { ...elem.props, ...handledProps }
          newProps['data-bind'] = newProps['data-scope'] = void 0
          return React.cloneElement(elem, newProps)
        }

        console.warn(`binding ${bind} failed, Don't find the property in`, dataScope)
        return elem
      }
    ]
  ])
}

function isMemberMethod() {
  return (
    arguments.length === 3
    && typeof arguments[0] === 'object'
    && !React.isValidElement(arguments[0])
    && typeof arguments[1] === 'string'
    && typeof arguments[2] === 'object'
    && !React.isValidElement(arguments[2])
  )
}

function bindMemberMethod(maybeScope) {
  return function () {
    // @binding member method
    if (isMemberMethod.apply(this, arguments)) {
      const descriptor = arguments[2]
      if ('value' in descriptor && typeof descriptor.value === 'function') {
        return {
          ...descriptor,
          value: function () {
            return convert(descriptor.value.apply(this, arguments), maybeScope || this.local)
          }
        }
      }
      if ('get' in descriptor) {
        return {
          ...descriptor,
          get: function get() {
            return convert(descriptor.get.call(this), maybeScope || this.local)
          }
        }
      }
      // getter
      throw new Error('@binding member method or getter, but ' + JSON.stringify(descriptor))
    }
  }
}

function bindClassOrFunc(maybeScope) {
  return function (element) {
    if (isComponentClass(element)) {
      class Binding extends element {
        static displayName = `Binding-${displayName(element)}`
        render() {
          return convert(super.render(), maybeScope || this.local)
        }
      }
      return observer(Binding)
    }
    if (typeof element === 'function') {
      return observer(function WrappedBinding() {
        // maybeScope -> scope
        return convert(
          element.apply(this, arguments),
          maybeScope || this.local
        )
      })
    }
  }
}

/**
 * @example
 *      1. use in class wrap  @binding(?scope) Component
 *      2. use in element wrap  binding(...element)
 *      3. use in element wrap  binding(scope)(...element)
 *      4. use in member render method or getter element
 * @param element
 * @return View
 */
export default function binding(element) {

  const newClass = bindClassOrFunc.apply(this, [null]).apply(this, arguments)
  if (newClass) {
    return newClass
  }

  // @binding member method
  const descriptor = bindMemberMethod.apply(this, [null]).apply(this, arguments)
  if (descriptor) {
    return descriptor
  }

  // binding(scope)(...element)
  if (
    element !== null && typeof element === 'object' && !React.isValidElement(element)
    // @thinking
    && isObservable(element)
  ) {
    return function bindedScope() {
      // @binding(scope)(Component)
      if (arguments.length === 1 && typeof arguments[0] === 'function') {
        return bindClassOrFunc
          .apply(this, [element])
          .apply(this, arguments)
      }
      // @binding(scope) memberMethod
      if (isMemberMethod.apply(this, arguments)) {
        return bindMemberMethod
          .apply(this, [element])
          .apply(this, arguments)
      }
      if (arguments.length === 0) {
        return
      }
      return convert(arguments.length === 1 ? arguments[0] : [...arguments], element)
    }
  }

  return arguments.length === 1
    ? convert(element)
    : convert([...arguments])
}
