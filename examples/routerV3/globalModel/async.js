/**
 * @file: GlobalModel
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */
import Root from './index'


class GlobalModel extends Root {
  pageA = () => new Promise(resolve => {
    require.ensure([], () => {
      resolve(require('../pageAModel').default)
    }, 'pageA')
  })
  pageB = () => new Promise(resolve => {
    require.ensure([], () => {
      resolve(require('../pageBModel').default)
    }, 'pageB')
  })
}

export default new GlobalModel()
