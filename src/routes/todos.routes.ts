import { Router } from 'express';
import { TodoController } from '../controllers/todos.controllers';

const route = Router();

route.get('/', TodoController.getTodos);

export default route;
