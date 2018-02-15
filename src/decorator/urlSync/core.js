/* eslint-disable */
/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */

import getStateLifeDecorator from '../utils/getStateLifeDecorator'

export default getStateLifeDecorator({
  save(key, value, { query, path, module }) {
    location.href = urlUtils.link(path, { ...query, [key]: value }, module)
  },
  fetch() {
    return urlUtils.parse(true)
  },
  get(key) {
    return this.fetch().query[key]
  }
}, 'urlsync')
