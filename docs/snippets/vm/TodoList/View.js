import { h, binding } from 'react-mobx-vm'
import * as React from 'react'

@binding
export default class TodoList extends React.Component {

  render() {
    const todoStore = this.local
    return (
      <div>
        <input data-bind="newTodoTitle" />
        <button onClick={this.handleNewTodoClick}>Add</button>
        <ul>
          {todoStore.todos.map(todo => h(todo, { key: todo.id }))}
        </ul>
        Tasks left: {todoStore.unfinishedTodoCount}
      </div>
    )
  }

  handleNewTodoClick = (e) => {
    e.stopPropagation()
    this.local.addTodo(this.newTodoTitle)
    this.local.newTodoTitle = ''
  }
}
