import React, {
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import useDidMount from '@Hooks/useDidMount';
import useDispatch from '@Hooks/useDispatch';
import useMappedState from '@Hooks/useMappedState';
import Loading from '@Components/Base/Loading';
import {
  getOrderBoardList,
} from '@Reducers/orderboard/actions';
import Styles from './index.module.css';

function OrderBoard() {
  /* Global & Local States */
  const dispatch = useDispatch();
  const storeOrderBoard = useMappedState((state) => state.orderBoard);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstUpdate, setIsFirstUpdate] = useState(false);
  /* Functions */
  const requestGetTodoList = (page) => {
    dispatch(getOrderBoardList(page));
    setIsLoading(true);
  };
  const initialize = () => {
    setIsFirstUpdate(true);
    requestGetTodoList(1);
  };
  /* Views */
  const RenderLoading = useMemo(() => (
    <Loading
      typePosition="relative"
      typeBackground="white"
      isLoading={isLoading}
      typeZIndex={10003}
    />
  ), [isLoading]);
  /* Hooks */
  useDidMount(() => {
    initialize();
  });
  useEffect(() => {
    if (!isFirstUpdate) return;
    if (!storeOrderBoard.orderBoardList.error) {
      setIsLoading(false);
    }
    if (storeOrderBoard.orderBoardList.error) {
      setIsLoading(false);
    }
  }, [storeOrderBoard.orderBoardList]);
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
          sm={6}
          md={4}
        >
          <div className={classNames(Styles.orderBoardHeaderContainer)}>
            Order Board Action
          </div>
          <div className={classNames(Styles.orderBoardListContainer)}>
            Order Board List
          </div>
        </Grid>
        {RenderLoading}
      </Grid>
    </div>
  );
}

export default memo(OrderBoard);
