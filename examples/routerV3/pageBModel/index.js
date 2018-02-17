import { observable } from 'mobx'
import Root from '../../../src/Model/Root'
import bindView from '../../../src/decorator/bindView'
import storageSync from '../../../src/decorator/storageSync'
import View from './View'

@bindView(View)
class PageBModel extends Root {
  @storageSync('bVal')
  @observable value = 'pageB'
}

export default new PageBModel()
