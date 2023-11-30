import type { Request, Response } from 'express';
import { TodoModels } from '../models/todos.models';
import { Todo } from '../types/todo';

const getTodos = (_: Request, res: Response) => {
  TodoModels.selectTodos()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      throw err;
    });
};

const getOneTodo = (req: Request, res: Response) => {
  TodoModels.selectOneTodo(req.params.id).then((result) => {
    if (result.length === 0) {
      res
        .status(404)
        .json({ message: `There's no todo with ID (${req.params.id})` });
    } else {
      res.json(result);
    }
  });
};

const createTodo = (req: Request, res: Response) => {
  TodoModels.insertTodo(req.body as Todo)
    .then(({ affectedRows, insertId }) => {
      if (affectedRows === 1) {
        res.json({
          message: `A new todo has been created with ID (${insertId}).`,
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};

const updateTodo = (req: Request, res: Response) => {
  TodoModels.updateTodo(req.body as Todo, req.params.id as Todo['id'])
    .then(({ affectedRows }) => {
      if (affectedRows === 1) {
        res.json({
          message: `A todo with ID (${req.params.id}) has been updated.`,
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const TodoController = {
  getTodos,
  getOneTodo,
  createTodo,
  updateTodo,
};
