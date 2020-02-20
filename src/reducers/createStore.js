import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { createGlobalReducer } from './global';
import { createMessageReducer } from './message';
import { createTodoListReducer } from './todo';

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
      todo: createTodoListReducer({
        initialState: initialState.todo,
      }),
    }),
    applyMiddleware(thunk),
  );
}

export default createStore;
