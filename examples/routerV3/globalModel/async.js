/**
 * @file: GlobalModel
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */
import Root from './index'


class GlobalModel extends Root {
  pageA = () => new Promise(resolve => {
    require.ensure([], require => {
      resolve(require('../pageAModel'))
    }, 'pageA')
  })
  pageB = () => new Promise(resolve => {
    require.ensure([], require => {
      console.log(require('../pageBModel'))
      resolve(require('../pageBModel'))
    }, 'pageB')
  })
}

export default new GlobalModel()
