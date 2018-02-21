/**
 * @file react
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */
import core from './core'

/** 
 * 发生改变之后，将会触发该成员方法
 * @name reactReaction
 * @public
 * @example
 * class View extends React.Component {
 *    \@observable val = '123'
 *    \@observable deep = { key: '123' }
 * 
 *    \@reaction('val', 'deep.key')
 *    reactionMethod(val, deepKey, dispose) {
 *      // 当 `this.val` `this.deep.key`
 *      // 发生改变之后，将会触发该方法
 *      // 与`autorun`不同的是，它第一次不会被触发
 *      
 *      // 调用 dispose 则会销毁掉该监听
 *      dispose && dispose()
 *    }
 * }
 */
export default core.bind(null, {
  init: 'componentDidMount',
  exit: 'componentWillUnmount'
})
