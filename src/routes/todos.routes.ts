import { Router } from 'express';
import { TodoController } from '../controllers/todos.controllers';

const route = Router();

route.get('/', TodoController.getTodos);
route.get('/:id', TodoController.getOneTodo);

export default route;
