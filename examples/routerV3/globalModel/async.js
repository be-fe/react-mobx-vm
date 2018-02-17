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
      resolve(require('../pageAModel').default || require('../pageAModel'))
    }, 'pageA')
  })
  pageB = () => new Promise(resolve => {
    require.ensure([], require => {
      resolve(require('../pageBModel').default || require('../pageAModel'))
    }, 'pageB')
  })
}

export default new GlobalModel()
