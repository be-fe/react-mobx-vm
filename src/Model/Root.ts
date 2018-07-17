/**
 * @file   Root
 * @author yucong02
 */

import { action, toJS } from 'mobx'
import * as _ from 'lodash'
import addHideProps from '../utils/addHideProps'
import getViewId from '../utils/increaseId'

/**
 *
 * 建议所以的 Model 都继承自该类，提供了一些方法
 * @typedef Root
 * @public
 * @export
 * @class Root
 */
export default class Root {
  /**
   * 建议使用给方法创建实例对象，而不是 `new Model()` 原因参看 https://github.com/imcuttle/babel-plugin-class-properties-default-value
   * @static
   * @public
   * @param {object} [init={}]
   * @returns {Root}
   * @memberOf Root
   * @example
   * class Model extends Root {
   *    val = 123
   * }
   * const model = Model.create({ val: '345' })
   */
  static create(init: object = {}) {
    return new this().assign(init)
  }

  /**
   * 该方法对应与 React 的 componentDidMount 生命周期
   * @public
   * @param {object} props - View 中的 `this.props`
   * @memberOf Root
   */
  init(props: object) {}

  /**
   * 该方法对应与 React 的 componentWillReceiveProps 生命周期
   * @public
   * @param {object} props - View 中的 `nextProps`
   * @memberOf Root
   */
  update(props: object) {}

  /**
   * 该方法对应与 React 的 componentWillUnmount 生命周期
   * @public
   * @param {object} props - View 中的 `this.props`
   * @memberOf Root
   */
  exit(props: object) {}

  /**
   * 将 this 转换为 JSON
   * @public
   * @memberOf Root
   */
  toJSON() {
    const data = {}
    Object.keys(this).forEach(name => {
      // 嵌套支持
      if (this[name] && typeof this[name].toJSON === 'function') {
        data[name] = this[name].toJSON()
      } else {
        data[name] = this[name]
      }
    })
    return toJS(data)
  }

  /**
   *
   * 设置当前对象中 key 的值
   * @param {string | array} key
   * @param {any} value
   * @returns {Root}
   * @public
   * @memberOf Root
   * @example
   * Root
   *  .create()
   *  .setValue('a', {})
   *  .setValue('a.b', '123')
   *  .setValue(['a', 'b'], '456')
   */
  @action
  setValue(key, value) {
    _.set(this, key, value)
    return this
  }

  constructor(init = {}) {
    addHideProps(this, 'viewId', getViewId())

    this.assign(init)
  }

  /**
   * 批量赋值
   * @param {object | Root} data
   * @returns {Root}
   * @memberOf Root
   * @alias assignShallow
   * @public
   * @example
   * Root
   *  .create()
   *  .assign({ a: 'a', b: 'b' })
   *  .assignShallow({ a: 'a', b: 'b' })
   * // 支持嵌套赋值
   * class Nested extends Root {
   *   \@observable root = Root.create({ a: 'c' })
   * }
   * Nested
   *  .create({ root: { b: 'b' } })
   *  .root instanceof Root // true
   * Nested
   *  .create({ root: { b: 'b' } })
   *  .root.a === 'c' // true
   */
  @action
  assign(data) {
    data = toJS(data)
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        // if (typeof data[key] !== 'undefined') {
        if (this[key] instanceof Root) {
          this[key].assign(data[key])
        } else {
          this[key] = data[key]
        }
        // }
      }
    }
    return this
  }

  /**
   *
   * 拷贝当前对象
   * @returns {Root}  一个新的实例
   * @public
   * @memberOf Root
   */
  clone() {
    return (<any>this.constructor).create(this)
  }

  /**
   * 对比两个对象是否相同
   * @param {any} other
   * @returns {boolean}
   * @memberOf Root
   * @public
   * @example
   * Root.create().isEqual({}) // true
   * Root.create({ a: [1, 3] }).isEqual({ a: [1, 3] }) // true
   * Root.create({ a: [1, 3] }).isEqual(Root.create({ a: [1, 3] })) // true
   */
  isEqual(other) {
    return (
      this === other ||
      _.isEqual(this.toJSON(), other instanceof Root ? other.toJSON() : other)
    )
  }

  /**
   *  深拷贝批量赋值
   * @see [assign](#assign)
   * @param {object | Root} data
   * @returns {Root}
   * @memberOf Root
   * @public
   * @example
   * const a = Root.create().assignDeep({ a: 'a', b: 'b' })
   */
  assignDeep(data) {
    data = _.cloneDeep(toJS(data, false))
    return this.assign(data)
  }

  /**
   *  判断当前实例是否内容为空
   * @see [assign](#assign)
   * @returns {boolean}
   * @memberOf Root
   * @public
   * @example
   * Root.create().isEmpty() // true
   * Root.create({ a: '', b: [] }).isEmpty() // true
   * Root.create({ a: '', b: [], c: Root.create() }).isEmpty() // true
   * Root.create({ a: 'a', b: [] }).isEmpty() // false
   * Root.create({ a: '', b: ['a'] }).isEmpty() // false
   */
  isEmpty(): boolean {
    return _.every(this, value => {
      if (value instanceof Root) {
        return value.isEmpty()
      }
      return _.isEmpty(value)
    })
  }
}
