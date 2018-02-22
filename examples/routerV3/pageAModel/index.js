import { observable } from 'mobx'
import { bindView, urlSync, autorun, Root } from '../../../'
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
