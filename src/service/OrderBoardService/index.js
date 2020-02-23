import uuidv4 from 'uuid/v4';
import { delay, getIsUUID } from '@Tools/utility';

const defaultOrderBoardData = [
  {
    id: uuidv4(),
    name: 'Ducky One White',
    price: 2400,
    note: 'First keyboard',
  },
  {
    id: uuidv4(),
    name: 'Ducky Two Black',
    price: 1900,
    note: 'Second keyboard',
  },
  {
    id: uuidv4(),
    name: 'I-rocks K81',
    price: 3500,
    note: 'Third keyboard',
  },
];

class OrderBoardService {
  constructor() {
    this.serviceLocalKey = 'react-board:orderBoard';
  }

  async getLocalStorageOrderBoardList(page = 1, max = 10) {
    await delay(400);
    try {
      const localItemOrigin = localStorage.getItem(this.serviceLocalKey);
      const returnData = {
        list: [],
        page: {
          cur: 1,
          total: 1,
        },
      };
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        const { list, order } = localItemParse;
        const groupsByOrder = [];
        const groupsByMax = [];
        for (let i = 0; i < list.length; i += 1) {
          const index = order.findIndex((orderItem) => orderItem === list[i].id);
          if (index > -1) {
            groupsByOrder.splice(index, 0, list[i]);
          }
        }
        for (let i = 0, len = groupsByOrder.length; i < len; i += max) {
          groupsByMax.push(groupsByOrder.slice(i, i + max));
        }
        if (groupsByMax.length === 1) {
          returnData.list = groupsByMax[0];
          returnData.page = {
            cur: 1,
            total: groupsByMax.length,
          };
        } else if (groupsByMax.length > 0) {
          returnData.list = groupsByMax[page - 1];
          returnData.page = {
            cur: page,
            total: groupsByMax.length,
          };
        }
      } else {
        const newLocalData = {
          list: defaultOrderBoardData,
          order: defaultOrderBoardData.map((data) => data.id),
        };
        returnData.list = defaultOrderBoardData;
        returnData.page = {
          cur: 1,
          total: 1,
        };
        localStorage.setItem(this.serviceLocalKey, JSON.stringify(newLocalData));
      }
      return returnData;
    } catch (error) {
      throw new Error('Get Local OrderBoard List Error', error);
    }
  }

  async getLocalStorageOrderBoardItem(id) {
    await delay(400);
    try {
      const localItemOrigin = localStorage.getItem(this.serviceLocalKey);
      let returnData = {};
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        if (getIsUUID(id)) {
          const targetItemIndex = localItemParse.list.findIndex((item) => item.id === id);
          if (targetItemIndex > -1) {
            returnData = localItemParse.list[targetItemIndex];
          }
        }
      }
      return returnData;
    } catch (error) {
      throw new Error('Get Local OrderBoard Item Error', error);
    }
  }

  async postLocalStorageOrderBoardItem(data = { name: '', price: 0, note: '' }) {
    await delay(400);
    try {
      const localItemOrigin = localStorage.getItem(this.serviceLocalKey);
      const returnData = {};
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        const newDataID = uuidv4();
        const newListData = { id: newDataID, ...data };
        const newOrderData = newDataID;
        returnData.id = newDataID;
        localItemParse.list.unshift(newListData);
        localItemParse.order.unshift(newOrderData);
        localStorage.setItem(this.serviceLocalKey, JSON.stringify(localItemParse));
      }
      return returnData;
    } catch (error) {
      throw new Error('Post Local OrderBoard Item Error', error);
    }
  }

  async putLocalStorageOrderBoardItem(id = '', data = { name: '', price: 0, note: '' }) {
    await delay(400);
    try {
      const localItemOrigin = localStorage.getItem(this.serviceLocalKey);
      const returnData = {};
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        if (getIsUUID(id)) {
          const targetItemIndex = localItemParse.list.findIndex((item) => item.id === id);
          if (targetItemIndex > -1) {
            localItemParse.list[targetItemIndex] = {
              ...localItemParse.list[targetItemIndex],
              ...data,
            };
          }
        }
        localStorage.setItem(this.serviceLocalKey, JSON.stringify(localItemParse));
      }
      return returnData;
    } catch (error) {
      throw new Error('Post Local OrderBoard Item Error', error);
    }
  }

  async patchLocalStorageOrderBoardIndex(id = '', data = { index: -1 }) {
    await delay(400);
    try {
      const localItemOrigin = localStorage.getItem(this.serviceLocalKey);
      const returnData = {};
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        if (getIsUUID(id)) {
          const targetItemOrderIndex = localItemParse.order.indexOf(id);
          if (targetItemOrderIndex > -1) {
            const orderElement = localItemParse.order.splice(targetItemOrderIndex, 1);
            localItemParse.order.splice(data.index, 0, orderElement);
          }
          localStorage.setItem(this.serviceLocalKey, JSON.stringify(localItemParse));
        }
      }
      return returnData;
    } catch (error) {
      throw new Error('Update Local OrderBoard Item Index Error', error);
    }
  }

  async deleteLocalStorageOrderBoardItem(id = '') {
    await delay(400);
    try {
      const localItemOrigin = localStorage.getItem(this.serviceLocalKey);
      const returnData = {};
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        if (getIsUUID(id)) {
          const targetItemListIndex = localItemParse.list.findIndex((item) => item.id === id);
          if (targetItemListIndex > -1) {
            localItemParse.list.splice(targetItemListIndex, 1);
            const targetItemOrderIndex = localItemParse.order.indexOf(id);
            if (targetItemOrderIndex > -1) {
              localItemParse.order.splice(targetItemOrderIndex, 1);
            }
          }
          localStorage.setItem(this.serviceLocalKey, JSON.stringify(localItemParse));
        }
      }
      return returnData;
    } catch (error) {
      throw new Error('Delete Local OrderBoard Item Error', error);
    }
  }
}

export default OrderBoardService;
