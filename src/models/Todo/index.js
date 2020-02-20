import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';

class Todo extends Immerable {
  constructor() {
    super();
    this.todoList = {
      list: [],
      page: {
        total: 1,
        cur: 1,
      },
    };
    this.todoItems = {};
  }

  updateTodoList(newTodoList) {
    const newCloneTodoList = cloneDeep(newTodoList);
    this.todoList = newCloneTodoList;
  }

  updateTodoItem(newTodoItems) {
    const newCloneTodoItems = cloneDeep(newTodoItems);
    this.todoItems = newCloneTodoItems;
  }
}

export default Todo;
