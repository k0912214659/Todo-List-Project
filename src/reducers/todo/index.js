import produce from 'immer';
import { TODO_ACTION } from '@Reducers/createConstants';

export function createTodoListReducer(params) {
  return (
    state = params.initialState,
    action,
  ) => produce(state, (_draft) => {
    const draft = _draft;
    switch (action.type) {
      case TODO_ACTION.SET_TODO_LIST:
        draft.updateTodoList(action.list);
        break;
      case TODO_ACTION.SET_TODO_ITEMS:
        draft.updateTodoItem(action.items);
        break;
      default:
        break;
    }
  });
}
