import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import Grid from '@material-ui/core/Grid';
import useDidMount from '@Hooks/useDidMount';
import useDispatch from '@Hooks/useDispatch';
import useMappedState from '@Hooks/useMappedState';
import Loading from '@Components/Base/Loading';
import ModalOrderBoardEditor from '@Components/Modals/ModalOrderBoardEditor';
import {
  getOrderBoardList,
  postOrderBoardItem,
  putOrderBoardItem,
  deleteOrderBoardItem,
} from '@Reducers/orderboard/actions';
import OrderBoardHeader from './SubComponent/OrderBoardHeader';
import OrderBoardList from './SubComponent/OrderBoardList';
import Styles from './index.module.css';

const ModalEditOrderBoardDef = {
  data: {
    id: '',
    name: '',
    price: 0,
    note: '',
  },
  type: 0,
  isOpen: false,
};

function OrderBoard() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeOrderBoard = useMappedState((state) => state.orderBoard);
  const [requestCounter, setRequestCounter] = useState(0);
  const [modalEditOrderBoard, setModalEditOrderBoard] = useState(ModalEditOrderBoardDef);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const requestGetOrderBoardList = (page) => {
    dispatch(getOrderBoardList(page));
    setIsLoading(true);
  };
  const requestPostOrderBoardItem = (data, onSuccessCallBack, onFailedCallBack) => {
    dispatch(postOrderBoardItem(data, onSuccessCallBack, onFailedCallBack));
  };
  const requestPutOrderBoardItem = (id, data, onSuccessCallBack, onFailedCallBack) => {
    dispatch(putOrderBoardItem(id, data, onSuccessCallBack, onFailedCallBack));
  };
  const requestDeleteOrderBoardItem = (orderBoardIndex, onSuccessCallBack, onFailedCallBack) => {
    dispatch(deleteOrderBoardItem(orderBoardIndex, onSuccessCallBack, onFailedCallBack));
    setIsLoading(true);
  };
  const onOpenEditOrderBoard = (type, orderBoard) => {
    const newModelCreateCategory = cloneDeep(modalEditOrderBoard);
    newModelCreateCategory.isOpen = true;
    newModelCreateCategory.type = type;
    if (orderBoard) {
      newModelCreateCategory.data = { ...orderBoard };
    }
    setModalEditOrderBoard(newModelCreateCategory);
  };
  const onCloseEditOrderBoard = () => {
    const newModelCreateCategory = cloneDeep(ModalEditOrderBoardDef);
    setModalEditOrderBoard(newModelCreateCategory);
  };
  const onOrderBoardPageClick = (page) => {
    requestGetOrderBoardList(page);
    setRequestCounter(1);
  };
  const onOrderBoardItemCreate = (data, onModalCallBack) => {
    const onSuccessCallBack = () => {
      onModalCallBack();
      requestGetOrderBoardList(storeOrderBoard.orderBoardList.page.cur);
      setRequestCounter(1);
    };
    const onFailedCallBack = () => {
      onModalCallBack();
    };
    requestPostOrderBoardItem(data, onSuccessCallBack, onFailedCallBack);
  };
  const onOrderBoardItemUpdate = (id, data, onModalCallBack) => {
    const onSuccessCallBack = () => {
      onModalCallBack();
      requestGetOrderBoardList(storeOrderBoard.orderBoardList.page.cur);
      setRequestCounter(1);
    };
    const onFailedCallBack = () => {
      onModalCallBack();
    };
    requestPutOrderBoardItem(id, data, onSuccessCallBack, onFailedCallBack);
  };
  const onOrderBoardItemRemove = (orderBoardIndex) => {
    const onSuccessCallBack = () => {
      requestGetOrderBoardList(storeOrderBoard.orderBoardList.page.cur);
      setRequestCounter(1);
    };
    const onFailedCallBack = () => {
      requestGetOrderBoardList(storeOrderBoard.orderBoardList.page.cur);
      setRequestCounter(1);
    };
    requestDeleteOrderBoardItem(orderBoardIndex, onSuccessCallBack, onFailedCallBack);
  };
  const initialize = () => {
    setIsFirstUpdate(true);
    requestGetOrderBoardList(1);
    setRequestCounter(1);
  };
  /* Views */
  const RenderCreateCategoryModal = useMemo(() => (
    <ModalOrderBoardEditor
      open={modalEditOrderBoard.isOpen}
      data={modalEditOrderBoard.data}
      type={modalEditOrderBoard.type}
      onClose={onCloseEditOrderBoard}
      onCreate={onOrderBoardItemCreate}
      onUpdate={onOrderBoardItemUpdate}
    />
  ), [modalEditOrderBoard]);
  const RenderLoading = useMemo(() => (
    <Loading
      typePosition="relative"
      typeZIndex={10003}
      typeIcon="line:relative"
      isLoading={isLoading}
    />
  ), [isLoading]);
  /* Hooks */
  useDidMount(() => {
    initialize();
  });
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (!storeOrderBoard.orderBoardList.error) {
      setRequestCounter(requestCounter - 1);
    }
    if (storeOrderBoard.orderBoardList.error) {
      setRequestCounter(requestCounter - 1);
    }
  }, [storeOrderBoard.orderBoardList]);
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (requestCounter === 0) {
      setIsLoading(false);
    }
  }, [requestCounter]);
  /* Main */
  return (
    <div className={classNames(Styles.orderBoardContainer)}>
      <Grid
        className={classNames(Styles.orderBoardMainContainer)}
        container
        spacing={2}
        direction="row"
        justify="center"
      >
        <Grid
          className={classNames(Styles.orderBoardInnerContainer)}
          item
          xs={10}
          sm={8}
          md={6}
        >
          <div className={classNames(Styles.orderBoardHeaderContainer)}>
            <OrderBoardHeader
              onOpenEditOrderBoard={onOpenEditOrderBoard}
            />
          </div>
          <div className={classNames(Styles.orderBoardListContainer)}>
            <OrderBoardList
              orderBoardList={storeOrderBoard.orderBoardList}
              onOrderBoardPageClick={onOrderBoardPageClick}
              onOrderBoardItemRemove={onOrderBoardItemRemove}
              onOpenEditOrderBoard={onOpenEditOrderBoard}
            />
          </div>
        </Grid>
        {RenderCreateCategoryModal}
        {RenderLoading}
      </Grid>
    </div>
  );
}

export default memo(OrderBoard);
