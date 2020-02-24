import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { createGlobalReducer } from './global';
import { createMessageReducer } from './message';
import { createOrderBoardListReducer } from './orderboard';

async function createStore(params) {
  const { initialState } = params;
  return reduxCreateStore(
    combineReducers({
      global: createGlobalReducer({
        initialState: initialState.global,
      }),
      message: createMessageReducer({
        initialState: initialState.message,
      }),
      orderBoard: createOrderBoardListReducer({
        initialState: initialState.orderBoard,
      }),
    }),
    applyMiddleware(thunk),
  );
}

export default createStore;
