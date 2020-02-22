import axios from 'axios';
import {
  CreateTodoAPIS,
  CreateTodoLocalAPIS,
} from './todo-apis';

class TodoAPI {
  constructor({ host, target }) {
    this.apis = null;
    this._axiosCloud = axios.create({
      baseURL: host,
    });
    this._axiosLocal = host;
    this._initializeAPI(target);
  }

  _initializeAPI(apiTarget) {
    switch (apiTarget) {
      case 'local':
        this.apis = {
          todoAPI: CreateTodoLocalAPIS({
            client: this._axiosLocal,
          }),
        };
        break;
      case 'cloud':
        this.apis = {
          todoAPI: CreateTodoAPIS({
            client: this._axiosCloud,
          }),
        };
        break;
      default:
        this.apis = {
          todoAPI: CreateTodoLocalAPIS({
            client: this._axiosLocal,
          }),
        };
        break;
    }
  }
}

export default TodoAPI;
