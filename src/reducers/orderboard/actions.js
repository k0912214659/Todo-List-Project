import { ORDERBOARD_ACTION } from '@Reducers/createConstants';
import { errorCatch } from '@Reducers/errorCapture';

/* Todo */
export const SET_ORDERBOARD_LIST = ({ list }) => ({
  type: ORDERBOARD_ACTION.SET_ORDERBOARD_LIST,
  list,
});
export const SET_ORDERBOARD_ITEMS = ({ items }) => ({
  type: ORDERBOARD_ACTION.SET_ORDERBOARD_ITEMS,
  items,
});

/* Todo Action */
export const getOrderBoardList = (page, max) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.orderBoardAPI.getOrderBoardList(page, max);
  if (!result.error) {
    dispatch(SET_ORDERBOARD_LIST({
      list: {
        list: result.list,
        page: result.page,
      },
    }));
  }
  if (result.error) {
    dispatch(SET_ORDERBOARD_LIST({
      list: {
        list: result.list,
        page: result.page,
        error: result.error,
      },
    }));
    dispatch(errorCatch(result.error));
  }
};
export const getOrderBoardItem = (id) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.orderBoardAPI.getOrderBoardItem(id);
  if (!result.error) {
    dispatch(SET_ORDERBOARD_ITEMS({
      items: {
        item: result.items,
      },
    }));
  }
  if (result.error) {
    dispatch(SET_ORDERBOARD_ITEMS({
      items: {
        item: result.items,
        error: result.error,
      },
    }));
    dispatch(errorCatch(result.error));
  }
};
export const postOrderBoardItem = (data, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.orderBoardAPI.postOrderBoardItem(data);
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
export const putOrderBoardItem = (id, data, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.orderBoardAPI.putOrderBoardItem(id, data);
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
export const patchOrderBoardItemIndex = (id, data, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.orderBoardAPI.patchOrderBoardItemIndex(id, data);
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
export const deleteOrderBoardItem = (id, onSuccessCallBack, onFailedCallBack) => async (dispatch, getState) => {
  const apiObject = getState().global.globalAPIS.api;
  const result = await apiObject.apis.orderBoardAPI.deleteOrderBoardItem(id);
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
