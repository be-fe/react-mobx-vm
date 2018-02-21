import logger from '../../utils/logger'
/* eslint-disable */
/**
 * @file   autorun
 * @author yucong02
 */
import {
  invokedWithArgs
} from '../utils/index'
import autorun from './core'

const keyMap = {
  initKey: 'componentDidMount',
  updateKey: 'componentWillReceiveProps',
  exitKey: 'componentWillUnmount'
}

/** 
 * 发生改变之后，将会触发该成员方法
 * @name reactAutorun
 * @public
 * @example
 * class View extends React.Component {
 *    \@observable val = '123'
 *    \@observable deep = { key: '123' }
 * 
 *    \@autorun
 *    autorunMethod(dispose) {
 *      // 当 `this.val`
 *      // 发生改变之后，将会触发该方法
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
  return autorun(keyMap, ...args)
}
