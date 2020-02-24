import axios from 'axios';
import {
  CreateOrderBoardAPIS,
  CreateOrderBoardLocalAPIS,
} from './orderboard-apis';

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
          orderBoardAPI: CreateOrderBoardLocalAPIS({
            client: this._axiosLocal,
          }),
        };
        break;
      case 'cloud':
        this.apis = {
          orderBoardAPI: CreateOrderBoardAPIS({
            client: this._axiosCloud,
          }),
        };
        break;
      default:
        this.apis = {
          orderBoardAPI: CreateOrderBoardLocalAPIS({
            client: this._axiosLocal,
          }),
        };
        break;
    }
  }
}

export default TodoAPI;
