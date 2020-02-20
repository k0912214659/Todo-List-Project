import { TODO_ACTION } from '@Reducers/createConstants';

/* Todo */
export const SET_TODO_LIST = ({ list }) => ({
  type: TODO_ACTION.SET_TODO_LIST,
  list,
});
export const SET_TODO_ITEMS = ({ items }) => ({
  type: TODO_ACTION.SET_TODO_ITEMS,
  items,
});

/* Todo Action */
export const getTodoList = () => async (dispatch, getState) => {
  const result = getState().todo.todoList;
  dispatch(SET_TODO_LIST({
    list: { ...result },
  }));
};
export const getTodoItem = () => async (dispatch, getState) => {
  const result = getState().todo.todoItems;
  dispatch(SET_TODO_ITEMS({
    items: { ...result },
  }));
};
