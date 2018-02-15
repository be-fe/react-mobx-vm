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

export default (...args) => {
  if (invokedWithArgs(args)) {
    throw new Error('`autorun` don\'t need pass some arguments')
  }
  return autorun({ initKey: 'init', exitKey: 'exit' }, ...args)
}
