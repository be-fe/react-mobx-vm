/* eslint-disable */
/**
 * @file   autorun
 * @author yucong02
 */
import {
    invokedWithArgs
} from '../utils/index'
import autorun from './core'

export default (...args) => {
    if (invokedWithArgs(args)) {
        console.warn('`autorun` 不需要传参')
        return autorun.bind(null, null)
    } else {
        return autorun({initKey: 'init', exitKey: 'exit'}, ...args)
    }
}