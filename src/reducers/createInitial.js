import Global from '@Models/Global';
import Message from '@Models/Message';
import Todo from '@Models/Todo';

async function createInitial(param) {
  return {
    global: new Global(param),
    message: new Message(),
    todo: new Todo(),
  };
}

export default createInitial;
