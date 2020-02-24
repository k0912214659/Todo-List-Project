import produce from 'immer';
import { ORDERBOARD_ACTION } from '@Reducers/createConstants';

export function createOrderBoardListReducer(params) {
  return (
    state = params.initialState,
    action,
  ) => produce(state, (_draft) => {
    const draft = _draft;
    switch (action.type) {
      case ORDERBOARD_ACTION.SET_ORDERBOARD_LIST:
        draft.updateOrderBoardList(action.list);
        break;
      case ORDERBOARD_ACTION.SET_ORDERBOARD_ITEMS:
        draft.updateOrderBoardItem(action.items);
        break;
      default:
        break;
    }
  });
}
