/* eslint-disable */
/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */

import getStateLifeDecorator from '../utils/getStateLifeDecorator'

const keyName = '--[storage-sync]--'

export default getStateLifeDecorator({
    save(key, value, state) {
        localStorage.setItem(keyName, JSON.stringify({...state, [key]: value }))
    },
    fetch() {
        const str = localStorage.getItem(keyName)
        try {
            return JSON.parse(str) || {}
        } catch (ex) {
            return {}
        }
    },
    get(key) {
        return this.fetch()[key]
    }
}, 'storage-sync')
