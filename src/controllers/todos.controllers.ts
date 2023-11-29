import type { Request, Response } from 'express';
import { connection } from '../db/todos.db';

const getTodos = (_: Request, res: Response) => {
  connection.query('SELECT * FROM todos', (_err, result) => {
    if (_err) {
      res.json({ message: _err.message }).status(500);
    }

    res.json(result);
  });
};

const getOneTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const [rows] = connection.execute('SELECT * FROM `todos` WHERE `id` = ?', [
    id,
  ]);

  res.json(rows);
};

export const TodoController = {
  getTodos,
  getOneTodo,
};
