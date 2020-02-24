import Global from '@Models/Global';
import Message from '@Models/Message';
import OrderBoard from '@Models/OrderBoard';

async function createInitial(param) {
  return {
    global: new Global(param),
    message: new Message(),
    orderBoard: new OrderBoard(),
  };
}

export default createInitial;
