import { pool } from '../db/todos.db';
import type { ResultSetHeader } from 'mysql2';
import type { Todo } from '../types/todos';

const selectTodos = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos;');

    return rows as Todo[];
  } catch (error) {
    console.error(error);
  } finally {
    pool.releaseConnection(await pool.getConnection());
  }
};

const selectOneTodo = async (id: string) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM `todos` WHERE `id` = ?;', [
      id,
    ]);

    return rows as Todo[];
  } catch (error) {
    console.error(error);
  } finally {
    pool.releaseConnection(await pool.getConnection());
  }
};

const insertTodo = async ({ title, description }: Todo) => {
  try {
    const [rows] = await pool.execute(
      'INSERT INTO `todos` (`title`, `description`) VALUES (?, ?);',
      [title, description]
    );

    return rows as ResultSetHeader;
  } catch (error) {
    console.error(error);
  } finally {
    pool.releaseConnection(await pool.getConnection());
  }
};

const updateTodo = async ({ title, description }: Todo, id: Todo['id']) => {
  try {
    const [rows] = await pool.execute(
      'UPDATE `todos` SET `title` = ?, `description` = ? WHERE `id` = ?;',
      [title, description, id]
    );

    return rows as ResultSetHeader;
  } catch (error) {
    console.error(error);
  } finally {
    pool.releaseConnection(await pool.getConnection());
  }
};

const deleteTodo = async (id: Todo['id']) => {
  try {
    const [rows] = await pool.execute('DELETE FROM `todos` WHERE `id` = ?;', [
      id,
    ]);

    return rows as ResultSetHeader;
  } catch (error) {
    console.error(error);
  } finally {
    pool.releaseConnection(await pool.getConnection());
  }
};

export const TodoModels = {
  selectTodos,
  selectOneTodo,
  insertTodo,
  updateTodo,
  deleteTodo,
};
