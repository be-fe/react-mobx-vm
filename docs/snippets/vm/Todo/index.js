import { Root, bindView, observable, action } from 'react-mobx-vm'
import View from './View'

@bindView(View)
export default class Todo extends Root {
  @observable id = Math.random()
  @observable title = ''
  @observable finished = false
  @action toggle() {
    this.finished = !this.finished
  }
}
