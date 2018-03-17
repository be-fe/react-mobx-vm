/**
 * @file SymbolicLink
 * @author Cuttle Cong
 * @date 2018/3/16
 * @description
 */
import Root from './Root'
import symbolicLink from '../utils/symbolicLink'

/**
 * 用于创建链接对象
 * @see {SymbolicLink}
 * @public
 * @param ref {Object}
 * @param path {String}
 * @return {Symbolic}
 * @constructor
 */
export function Symbolic(ref, path) {
  if (!(this instanceof Symbolic)) {
    return new Symbolic(ref, path)
  }
  this.rule = [ref, path]
}

/**
 * 用于自定义的链接关系
 * @see {SymbolicLink}
 * @public
 * @param descriptor {object}
 * @return {SymbolicCustom}
 * @constructor
 * @extends {Symbolic}
 * @example
 * SymbolicCustom({
 *   get() {}
 *   set() {}
 * }, 'value')
 */
export function SymbolicCustom(descriptor) {
  if (!(this instanceof SymbolicCustom)) {
    return new SymbolicCustom(descriptor)
  }
  this.rule = descriptor
}
SymbolicCustom.prototype = Object.create(Symbolic.prototype)
SymbolicCustom.prototype.constructor = SymbolicCustom

function calcSymbolic(value) {
  let symbolic
  if (value instanceof Symbolic) {
    symbolic = value
  }
  return symbolic
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
 *    model = Model.create().setSymbolic('title', Symbolic(this, 'title'))
 *
 *    \@observable title = 'abc'
 * }
 *
 * const parent = Parent.create()
 * parent.model.title === parent.title // true
 * parent.title === 'abc' // true
 */
export default class SymbolicLink extends Root {
  /**
   * 单独设置 Symbolic
   * @example
   * model.setSymbolic('title', Symbolic(this, 'abc'))
   * @public
   * @memberOf {SymbolicLink}
   * @param path {String|Array}
   * @param symbolic {Symbolic}
   * @return {Root}
   */
  setSymbolic(path, symbolic) {
    const computedSymbolic = calcSymbolic(symbolic)
    computedSymbolic && symbolicLink(this, { [path]: computedSymbolic })
    return this
  }
}
