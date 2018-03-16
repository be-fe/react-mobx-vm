/**
 * @file SymbolicLink
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import Root from './Root'
import _ from 'lodash'
import symbolicLink from '../utils/symbolicLink'

/**
 * 用于创建链接对象
 * @see {SymbolicLink}
 * @public
 * @param ref {Object}
 * @param rule {String}
 * @param defaultValue {any}
 * @return {Symbolic}
 * @constructor
 */
export function Symbolic(ref, rule, defaultValue) {
  if (!(this instanceof Symbolic)) {
    return new Symbolic(ref, rule, defaultValue)
  }
  this.rule = [ref, rule]
  this.defaultValue = defaultValue
}

/**
 * 用于自定义的链接关系
 * @see {SymbolicLink}
 * @public
 * @param descriptor {object}
 * @param defaultValue {any}
 * @return {SymbolicCustom}
 * @constructor
 * @extends {Symbolic}
 * @example
 * SymbolicCustom({
 *   get() {}
 *   set() {}
 * }, 'defaultValue')
 */
export function SymbolicCustom(descriptor, defaultValue) {
  if (!(this instanceof SymbolicCustom)) {
    return new SymbolicCustom(descriptor, defaultValue)
  }
  this.rule = descriptor
  this.defaultValue = defaultValue
}
SymbolicCustom.prototype = Object.create(Symbolic.prototype)

function calcSymbolic(value) {
  let symbolicRule
  let data
  if (value instanceof Symbolic) {
    symbolicRule = value.rule
    data = value.defaultValue
  }
  else {
    data = value
  }
  return {
    data,
    symbolicRule
  }
}
function calcSymbolicSet(data) {
  const symbolicRuleSet = {}
  const init = {}
  if (data && typeof data === 'object') {
    _.each(data, (value, key) => {
      const { data, symbolicRule } = calcSymbolic(value)
      symbolicRuleSet[key] = symbolicRule
      if (typeof data !== 'undefined') {
        init[key] = data
      }
    })
  }
  return {
    init,
    symbolicRuleSet
  }
}

/**
 * 用于链接自己的引用到其他的地方
 *
 * @public
 * @export
 * @class SymbolicLink
 * @extends {Root}
 * @example
 * import { SymbolicLink, Root } from 'react-mobx-vm'
 * class Model extends SymbolicLink {
 *   \@observable title = 'modelTitle'
 * }
 *
 * class Parent extends Root {
 *    model = Model.create({
 *      title: Symbolic(this, 'title', 'abc'),
 *      other: Symbolic({}, 'abc'),
 *    })
 *
 *    \@observable title
 * }
 *
 * const parent = Parent.create()
 * parent.model.title === parent.title
 */
export default class SymbolicLink extends Root {

  static create(mixedSymbolicRule) {
    return new this({}).assign(mixedSymbolicRule)
  }

  /**
   * 单独设置 Symbolic
   * @example
   * model.setSymbolic('title', Symbolic(this, { 'title': 'abcd' }, 'abc'))
   * model.setSymbolic(
   *    'title',
   *    Symbolic(this, { 'title': 'abcd' })
   * ).title === 'abcd' // 不等于 undefined
   * // 通过 setValue 明确设置 undefined
   * model.setValue('title', undefined)
   * @public
   * @memberOf {SymbolicLink}
   * @param path {String|Array}
   * @param symbolic {Symbolic}
   * @return {Root}
   */
  setSymbolic(path, symbolic) {
    const { data, symbolicRule } = calcSymbolic(symbolic)
    symbolicRule && symbolicLink(this, { [path]: symbolicRule })
    if (typeof data === 'undefined') {
      return this
    }
    return this.setValue(path, data)
  }

  /**
   * @alias assign
   * @param mixedSymbolicRule {{path: Object|Symbolic}}
   * @return {SymbolicLink}
   */
  assignShallow(mixedSymbolicRule) {
    const { init, symbolicRuleSet } = calcSymbolicSet(mixedSymbolicRule)
    if (symbolicRuleSet
        && typeof symbolicRuleSet === 'object'
        && Object.keys(symbolicRuleSet).length !== 0) {
      symbolicLink(this, symbolicRuleSet)
    }
    _.each(init, (val, key) => {
      if (typeof val !== 'undefined') {
        this.setValue(key, val)
      }
    })
    return this
  }
}
