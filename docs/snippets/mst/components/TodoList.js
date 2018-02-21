import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'

import { Todo } from './Todo'

@observer
export class TodoList extends React.Component {
  @observable newTodoTitle = ''

  render() {
    const { todoStore } = this.props
    return (
      <div>
        <input value={this.newTodoTitle} onChange={this.handleChange}/>
        <button onClick={this.handleNewTodoClick}>Add</button>
        <ul>
          {todoStore.todos.map(todo => <Todo todo={todo} key={todo.id}/>)}
        </ul>
        Tasks left: {todoStore.unfinishedTodoCount}
      </div>
    )
  }

  handleChange = (e) => {
    this.newTodoTitle = e.target.value
  }

  handleNewTodoClick = (e) => {
    e.stopPropagation()
    this.props.todoStore.addTodo(this.newTodoTitle)
    this.newTodoTitle = ''
  }
}
