/**
 * @file react
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */
import core from './core'

export default core.bind(null, {
  init: 'componentDidMount',
  exit: 'componentWillUnmount'
})
