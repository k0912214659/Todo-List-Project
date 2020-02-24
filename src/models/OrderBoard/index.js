import cloneDeep from 'lodash/cloneDeep';
import Immerable from '@Models/GeneralImmer';

class OrderBoard extends Immerable {
  constructor() {
    super();
    this.orderBoardList = {
      list: [],
      page: {
        total: 1,
        cur: 1,
      },
    };
    this.orderBoardItems = {};
  }

  updateOrderBoardList(newOrderBoardList) {
    const newCloneOrderBoardList = cloneDeep(newOrderBoardList);
    this.orderBoardList = newCloneOrderBoardList;
  }

  updateOrderBoardItem(newOrderBoardItems) {
    const newCloneOrderBoardItems = cloneDeep(newOrderBoardItems);
    this.orderBoardItems = newCloneOrderBoardItems;
  }
}

export default OrderBoard;
