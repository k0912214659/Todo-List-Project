import uuidv4 from 'uuid/v4';
import { getIsUUID } from '@Tools/utility';

class TodoService {
  constructor() {
    this.serviceLocalKey = 'react-board:todoList';
  }

  async getLocalStorageTodoList(page = 1, max = 10) {
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
          returnData.list = groupsByMax[page];
          returnData.page = {
            cur: page,
            total: groupsByMax.length,
          };
        }
      } else {
        const newLocalData = {
          list: [],
          order: [],
        };
        localStorage.setItem(this.serviceLocalKey, JSON.stringify(newLocalData));
      }
      return returnData;
    } catch (error) {
      throw new Error('Get Local Todo List Error', error);
    }
  }

  async getLocalStorageTodoItem(id) {
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
      throw new Error('Get Local Todo Item Error', error);
    }
  }

  async postLocalStorageTodoItem(data = { name: '', price: 0, note: '' }) {
    try {
      const localItemOrigin = localStorage.getItem(this.serviceLocalKey);
      const returnData = {};
      if (localItemOrigin) {
        const localItemParse = JSON.parse(localItemOrigin);
        const newDataID = uuidv4();
        const newListData = { id: newDataID, ...data };
        const newOrderData = newDataID;
        returnData.id = newDataID;
        localItemParse.list.push(newListData);
        localItemParse.order.push(newOrderData);
        localStorage.setItem(this.serviceLocalKey, JSON.stringify(localItemParse));
      }
      return returnData;
    } catch (error) {
      throw new Error('Post Local Todo Item Error', error);
    }
  }

  async putLocalStorageTodoItem(id = '', data = { name: '', price: 0, note: '' }) {
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
      throw new Error('Post Local Todo Item Error', error);
    }
  }

  async patchLocalStorageTodoIndex(id = '', data = { index: -1 }) {
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
      throw new Error('Update Local Todo Item Index Error', error);
    }
  }

  async deleteLocalStorageTodoItem(id = '') {
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
      throw new Error('Delete Local Todo Item Error', error);
    }
  }
}

export default TodoService;
