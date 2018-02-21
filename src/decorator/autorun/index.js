/* eslint-disable */
/**
 * @file   autorun
 * @author yucong02
 */
import {
  invokedWithArgs
} from '../utils/index'
import logger from '../../utils/logger'
import autorun from './core'


/** 
 * 监听数据发生改变之后，将会触发该成员方法，不同于 reaction
 * @name autorun
 * @public
 * @example
 * \@bindView(View)
 * class Model extends Root {
 *    \@observable val = '123'
 *    \@observable deep = { key: '123' }
 * 
 *    \@autorun
 *    autorunMethod(dispose) {
 *      // 当 `this.val`
 *      // 发生改变之后，将会触发该方法
 *      // 与`reaction`不同的是，它第一次初始化时会被触发
 *      console.log(this.val)
 *      // 调用 dispose 则会销毁掉该监听
 *      dispose && dispose()
 *    }
 * }
 */
export default (...args) => {
  if (invokedWithArgs(args)) {
    throw new Error('`autorun` don\'t need pass some arguments')
  }
  return autorun({ initKey: 'init', exitKey: 'exit' }, ...args)
}
