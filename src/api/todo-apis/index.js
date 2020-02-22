import TodoService from '@Service/TodoService';

/* Local Service API Interface */
export function CreateTodoLocalAPIS() {
  const LocalTodoService = new TodoService();
  return {
    getTodoList: async (page = 1, max = 10) => {
      try {
        const result = await LocalTodoService.getLocalStorageTodoList(page, max);
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
    getTodoItem: async (id) => {
      try {
        const result = await LocalTodoService.getLocalStorageTodoItem(id);
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
    postTodoItem: async (data) => {
      try {
        const result = await LocalTodoService.postLocalStorageTodoItem(data);
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
    putTodoItem: async (id, data) => {
      try {
        const result = await LocalTodoService.putLocalStorageTodoItem(id, data);
        return result;
      } catch (error) {
        const errorMessage = {
          error,
        };
        return errorMessage;
      }
    },
    patchTodoItemIndex: async (id, index) => {
      try {
        const result = await LocalTodoService.patchLocalStorageTodoIndex(id, index);
        return result;
      } catch (error) {
        const errorMessage = {
          error,
        };
        return errorMessage;
      }
    },
    deleteTodoItem: async (id) => {
      try {
        const result = await LocalTodoService.deleteLocalStorageTodoItem(id);
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
export function CreateTodoAPIS() {
  return {
    getTodoList: async () => {
      throw new Error('Please Implement Cloud API For Tool');
    },
    getTodoItem: async () => {
      throw new Error('Please Implement Cloud API For Tool');
    },
    putTodoItem: async () => {
      throw new Error('Please Implement Cloud API For Tool');
    },
    patchTodoItemIndex: async () => {
      throw new Error('Please Implement Cloud API For Tool');
    },
    deleteTodoItem: async () => {
      throw new Error('Please Implement Cloud API For Tool');
    },
  };
}
