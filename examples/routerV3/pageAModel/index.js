import { observable } from 'mobx'
import Root from '../../../src/Model/Root'
import bindView from '../../../src/decorator/bindView'
import urlSync from '../../../src/decorator/urlSync'
import View from './View'

@bindView(View)
class PageAModel extends Root {
  @urlSync('aVal')
  @observable value = 'pageA'
}

export default new PageAModel()
