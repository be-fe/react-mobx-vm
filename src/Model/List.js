/**
 * @file List
 * @author Cuttle Cong
 * @date 2018/4/12
 * @description
 */

import { observable, toJS, isArrayLike, action } from 'mobx'
import addHideProps from '../utils/addHideProps'
import inherit from '../utils/inherit'
import Root from './Root'

const classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

const ObservableArray = observable.array([]).constructor

/**
 * List 定义数组类型，非常适合于定义 Modal 后，使用`assign`方法一次性赋值
 * @typedef List
 * @public
 * @param init {any[]}
 * @param Type {Function}
 * @param options {object}
 * @constructor
 * @example
 *
 * class Model extends Root {
 *   \@observable a = 'xyz'
 *   \@observable b = 'abc'
 * }
 *
 * const list = List.create([{ a: 'xbb' }, { b: 'hhh' }], Model)
 *
 * list[0] instanceof Model === true
 * list[1] instanceof Model === true
 *
 * list.assign([{ a: 'xxx' }])
 * list[0] instanceof Model === true
 * list.length === 1
 */
function List(init = [], Type, options = {}) {
  classCallCheck(this, List)
  const arr = observable.array([], options)
  ObservableArray.apply(this, [[], arr.$mobx.enhancer])

  addHideProps(this, '_Type', Type)
  this.assign(init)
}

List.create = function create(init = [], Type, options = {}) {
  return new this([], Type, options).assign(init)
}
List.prototype._new = function _new(item) {
  if (this._Type && typeof this._Type.create === 'function') {
    if (item instanceof this._Type) {
      return item
    }
    return this._Type.create(item)
  }
  return new this._Type(item)
}

/**
 * 类似于 Array#push，但该方法被 `mobx#action` 修饰
 * @public
 * @param ...items {any[]}
 * @example
 * const list = List.create([], Model)
 * list.add({}, {})
 *
 * list[0] instanceof Model === true
 * list[1] instanceof Model === true
 */
List.prototype.add = action(function add(...items) {
  if (typeof this._Type === 'function') {
    items = items.map(this._new.bind(this))
  }
  return this.push(...items)
})
List.prototype.assignShallow = action(function assignShallow(items = []) {
  if (!isArrayLike(items)) {
    throw new Error(
      'List#assignShallow requires data which is like array, but ' +
        typeof items
    )
  }

  this.splice(0, this.length)
  this.add(...items)
  return this
})
inherit(List, Root)

List.prototype.toJSON = function() {
  return toJS(this)
}

function _extends(obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var value = Object.getOwnPropertyDescriptor(defaults, key)
    if (
      value &&
      (value.configurable ||
        typeof value.get === 'function' ||
        typeof value.set === 'function') &&
      obj[key] === undefined
    ) {
      Object.defineProperty(obj, key, value)
    }
  }
  return obj
}
_extends(List.prototype, ObservableArray.prototype)
_extends(List.prototype, Array.prototype)

export default List
