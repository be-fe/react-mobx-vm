/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */

import urlsync from './core'
import {invokedWithArgs} from '../utils'

const keyMap = {
    initKey: 'componentDidMount',
    updateKey: 'componentWillReceiveProps',
    exitKey: 'componentWillUnmount',
    loose: true
}

export default function (urlKeyOrTarget, property, descriptor) {
    if (invokedWithArgs(arguments)) {
        let options = property
        return (target, property, descriptor) =>
            urlsync(urlKeyOrTarget || property, {...keyMap, ...options}, target, property, descriptor)
    } else {
        return urlsync(property, keyMap, urlKeyOrTarget, property, descriptor)
    }
}
