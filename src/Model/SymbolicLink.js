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
 * @param path {String}
 * @param value {any}
 * @return {Symbolic}
 * @constructor
 */
export function Symbolic(ref, path, value) {
  if (!(this instanceof Symbolic)) {
    return new Symbolic(ref, path, value)
  }
  this.rule = [ref, path]
  this.value = value
}

/**
 * 用于自定义的链接关系
 * @see {SymbolicLink}
 * @public
 * @param descriptor {object}
 * @param value {any}
 * @return {SymbolicCustom}
 * @constructor
 * @extends {Symbolic}
 * @example
 * SymbolicCustom({
 *   get() {}
 *   set() {}
 * }, 'value')
 */
export function SymbolicCustom(descriptor, value) {
  if (!(this instanceof SymbolicCustom)) {
    return new SymbolicCustom(descriptor, value)
  }
  this.rule = descriptor
  this.value = value
}
SymbolicCustom.prototype = Object.create(Symbolic.prototype)
SymbolicCustom.prototype.constructor = SymbolicCustom

function calcSymbolic(value) {
  let symbolic
  let data
  if (value instanceof Symbolic) {
    symbolic = value
    data = value.value
  }
  else {
    data = value
  }
  return {
    data,
    symbolic
  }
}
function calcSymbolicSet(data) {
  const symbolicSet= {}
  const init = {}
  if (data && typeof data === 'object') {
    _.each(data, (value, key) => {
      const { data, symbolic } = calcSymbolic(value)
      symbolicSet[key] = symbolic
      if (typeof data !== 'undefined') {
        init[key] = data
      }
    })
  }
  return {
    init,
    symbolicSet
  }
}

function removeSymbolicValue(mixedSymbolicRule) {
  const set = {}
  _.each(mixedSymbolicRule, (val, key) => {
    if (val instanceof Symbolic) {
      const newVal = new val.constructor()
      newVal.rule = val.rule
      set[key] = newVal
    }
  })
  return set
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
 *    // 在 create 和 构造函数中不能写入 value: 'noop'
 *    model = Model.create({
 *      title: Symbolic(this, 'title', 'noop')
 *    })
 *
 *    \@observable title = 'abc'
 * }
 *
 * const parent = Parent.create()
 * parent.model.title === parent.title // true
 * parent.title === 'abc' // true
 */
export default class SymbolicLink extends Root {


  static create(mixedSymbolicRule) {
    return new this({}).assignSymbolic(removeSymbolicValue(mixedSymbolicRule))
  }

  constructor(init) {
    super({})
    return this.assignSymbolic(removeSymbolicValue(init))
  }

  /**
   * 单独设置 Symbolic
   * @example
   * model.setSymbolic('title', Symbolic(this, 'abc', 'abc'))
   * model.setSymbolic(
   *    'title',
   *    Symbolic(this, 'abc')
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
    const { data, symbolic: computedSymbolic } = calcSymbolic(symbolic)
    computedSymbolic && symbolicLink(this, { [path]: computedSymbolic })
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
  assignSymbolic(mixedSymbolicRule) {
    const { init, symbolicSet } = calcSymbolicSet(mixedSymbolicRule)
    if (symbolicSet
        && typeof symbolicSet === 'object'
        && Object.keys(symbolicSet).length !== 0) {
      symbolicLink(this, symbolicSet)
    }
    _.each(init, (val, key) => {
      if (typeof val !== 'undefined') {
        this.setValue(key, val)
      }
    })
    return this
  }
}
