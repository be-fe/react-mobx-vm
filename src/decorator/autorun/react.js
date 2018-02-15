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

export default (...args) => {
  if (invokedWithArgs(args)) {
    throw new Error('`autorun` don\'t need pass some arguments')
  }
  return autorun(keyMap, ...args)
}
