import type { Request, Response } from 'express';
import { TodoModels } from '../models/todos.models';

const getTodos = (req: Request, res: Response) => {
  TodoModels.selectTodos()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      throw err;
    });
};

export const TodoController = {
  getTodos,
};
