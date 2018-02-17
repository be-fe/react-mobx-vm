import { observable } from 'mobx'
import Root from '../../../src/Model/Root'
import bindView from '../../../src/decorator/bindView'
import urlSync from '../../../src/decorator/urlSync'
import autorun from '../../../src/decorator/autorun'
import View from './View'

class PageInfo extends Root {
  @observable total = 100
  @observable size = 10
  @observable number = 10
}

@bindView(View)
class PageAModel extends Root {
  @urlSync('aVal')
  @observable value = 'pageA'

  @urlSync('p')
  @observable page = new PageInfo().assign({ size: 5, number: 1 })

  @autorun
  auto() {
    console.log('page', this.page.toJSON())
  }
}

export default new PageAModel()
