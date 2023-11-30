import { pool } from '../db/todos.db';

const selectTodos = async () => {
  const [rows] = await pool.query('SELECT * FROM todos;');

  return rows;
};

const selectOneTodo = async (id: string) => {
  const [rows] = await pool.execute('SELECT * FROM `todos` WHERE `id` = ?;', [
    id,
  ]);

  return rows;
};

export const TodoModels = {
  selectTodos,
  selectOneTodo,
};
