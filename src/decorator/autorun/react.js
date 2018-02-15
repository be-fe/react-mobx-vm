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
    exitKey: 'componentWillUnmount',
}

export default (...args) => {
    if (invokedWithArgs(args)) {
        console.warn('`autorun` 不需要传参')
        return autorun.bind(null, null)
    } else {
        return autorun(keyMap, ...args)
    }
}
