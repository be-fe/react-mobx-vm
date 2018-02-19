/**
 * @file GlobalModel
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */
import Root from './index'
import pageA from '../pageAModel'
import pageB from '../pageBModel'


class GlobalModel extends Root {
  pageA = pageA
  pageB = pageB
}

export default new GlobalModel()
