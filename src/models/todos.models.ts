import { pool } from '../db/todos.db';

const selectTodos = async () => {
  const [result] = await pool.query('SELECT * FROM todos;');

  return result;
};

export const TodoModels = {
  selectTodos,
};
