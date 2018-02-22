import { observable } from 'mobx'
import { bindView, storageSync, Root } from '../../../dist/react-mobx-vm'
import View from './View'

@bindView(View)
class PageBModel extends Root {
  @storageSync('bVal')
  @observable value = 'pageB'
}

export default new PageBModel()
