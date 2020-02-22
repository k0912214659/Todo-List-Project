import { TODO_ACTION } from '@Reducers/createConstants';
import { errorCatch } from '@Reducers/errorCapture';

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
export const getTodoList = (page, max) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.todoAPI.getTodoList(page, max);
  if (!result.error) {
    dispatch(SET_TODO_LIST({
      list: {
        list: result.list,
        page: result.page,
      },
    }));
  }
  if (result.error) {
    dispatch(SET_TODO_LIST({
      list: {
        list: result.list,
        page: result.page,
        error: result.error,
      },
    }));
    dispatch(errorCatch(result.error));
  }
};
export const getTodoItem = (id) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.todoAPI.getTodoItem(id);
  if (!result.error) {
    dispatch(SET_TODO_ITEMS({
      items: {
        item: result.items,
      },
    }));
  }
  if (result.error) {
    dispatch(SET_TODO_ITEMS({
      items: {
        item: result.items,
        error: result.error,
      },
    }));
    dispatch(errorCatch(result.error));
  }
};
export const postTodoItem = (data, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.todoAPI.postTodoItem(data);
  if (!result.error) {
    if (onSuccessCallBack) {
      onSuccessCallBack();
    }
  }
  if (result.error) {
    if (onFailedCallBack) {
      onFailedCallBack();
    }
    dispatch(errorCatch(result.error));
  }
};
export const putTodoItem = (id, data, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.todoAPI.putTodoItem(id, data);
  if (!result.error) {
    if (onSuccessCallBack) {
      onSuccessCallBack();
    }
  }
  if (result.error) {
    if (onFailedCallBack) {
      onFailedCallBack();
    }
    dispatch(errorCatch(result.error));
  }
};
export const patchTodoItemIndex = (id, data, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.todoAPI.patchTodoItemIndex(id, data);
  if (!result.error) {
    if (onSuccessCallBack) {
      onSuccessCallBack();
    }
  }
  if (result.error) {
    if (onFailedCallBack) {
      onFailedCallBack();
    }
    dispatch(errorCatch(result.error));
  }
};
export const deleteTodoItem = (id, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.todoAPI.deleteTodoItem(id);
  if (!result.error) {
    if (onSuccessCallBack) {
      onSuccessCallBack();
    }
  }
  if (result.error) {
    if (onFailedCallBack) {
      onFailedCallBack();
    }
    dispatch(errorCatch(result.error));
  }
};
