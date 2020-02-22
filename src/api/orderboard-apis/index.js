import OrderBoardService from '@Service/OrderBoardService';

/* Local Service API Interface */
export function CreateOrderBoardLocalAPIS() {
  const LocalOrderBoardService = new OrderBoardService();
  return {
    getOrderBoardList: async (page = 1, max = 10) => {
      try {
        const result = await LocalOrderBoardService.getLocalStorageOrderBoardList(page, max);
        return result;
      } catch (error) {
        const errorMessage = {
          list: [],
          page: {
            total: 1,
            cur: 1,
          },
          error,
        };
        return errorMessage;
      }
    },
    getOrderBoardItem: async (id) => {
      try {
        const result = await LocalOrderBoardService.getLocalStorageOrderBoardItem(id);
        return result;
      } catch (error) {
        const errorMessage = {
          item: {
            id: '',
            name: '',
            price: 0,
            note: '',
          },
          error,
        };
        return errorMessage;
      }
    },
    postOrderBoardItem: async (data) => {
      try {
        const result = await LocalOrderBoardService.postLocalStorageOrderBoardItem(data);
        return result;
      } catch (error) {
        const errorMessage = {
          item: {
            name: '',
            price: 0,
            note: '',
          },
          error,
        };
        return errorMessage;
      }
    },
    putOrderBoardItem: async (id, data) => {
      try {
        const result = await LocalOrderBoardService.putLocalStorageOrderBoardItem(id, data);
        return result;
      } catch (error) {
        const errorMessage = {
          error,
        };
        return errorMessage;
      }
    },
    patchOrderBoardItemIndex: async (id, index) => {
      try {
        const result = await LocalOrderBoardService.patchLocalStorageOrderBoardIndex(id, index);
        return result;
      } catch (error) {
        const errorMessage = {
          error,
        };
        return errorMessage;
      }
    },
    deleteOrderBoardItem: async (id) => {
      try {
        const result = await LocalOrderBoardService.deleteLocalStorageOrderBoardItem(id);
        return result;
      } catch (error) {
        const errorMessage = {
          error,
        };
        return errorMessage;
      }
    },
  };
}
/* Cloud Service API Interface */
export function CreateOrderBoardAPIS() {
  return {
    getOrderBoardList: async () => {
      throw new Error('Please Implement Cloud API For OrderBoard');
    },
    getOrderBoardItem: async () => {
      throw new Error('Please Implement Cloud API For OrderBoard');
    },
    putOrderBoardItem: async () => {
      throw new Error('Please Implement Cloud API For OrderBoard');
    },
    patchOrderBoardItemIndex: async () => {
      throw new Error('Please Implement Cloud API For OrderBoard');
    },
    deleteOrderBoardItem: async () => {
      throw new Error('Please Implement Cloud API For OrderBoard');
    },
  };
}
