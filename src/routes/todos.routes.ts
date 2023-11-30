import { Router } from 'express';
import { TodoController } from '../controllers/todos.controllers';

const route = Router();

route.get('/', TodoController.getTodos);
route.get('/:id', TodoController.getOneTodo);
route.post('/', TodoController.createTodo);
route.put('/:id', TodoController.updateTodo);
route.delete('/:id', TodoController.deleteTodo);

export default route;
