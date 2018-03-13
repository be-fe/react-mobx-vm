import {
  Root,
  bindView,
  observable,
  computed,
  action
} from 'react-mobx-vm'
import View from './View'

import Todo from '../Todo'

@bindView(View)
export default class TodoList extends Root {
  @observable todos = []
  @observable newTodoTitle = ''
  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length
  }
  @action addTodo() {
    this.todos.push(Todo.create({ title: this.newTodoTitle }))
  }
}
