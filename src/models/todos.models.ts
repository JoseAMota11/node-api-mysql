import { pool } from '../db/todos.db';
import type { ResultSetHeader } from 'mysql2';
import type { Todo } from '../types/todos';
import { Filters } from '../types/filters';

const selectTodos = async ({
  orderby = 'created_at',
  descending_order = 'ASC',
}: Filters) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `todos` ORDER BY ' +
        pool.escapeId(orderby) +
        ' ' +
        descending_order +
        ';'
    );

    return rows as Todo[];
  } catch (error) {
    console.error(error);
  } finally {
    pool.releaseConnection(await pool.getConnection());
  }
};

const selectTodosBySearch = async (
  search: string,
  { orderby = 'created_at', descending_order = 'ASC' }: Filters
) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM `todos` WHERE `title` LIKE LOWER(?) OR `description` LIKE LOWER(?) ORDER BY ' +
        pool.escapeId(orderby) +
        ' ' +
        descending_order +
        ';',
      [`%${search}%`, `%${search}%`]
    );

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

const markTodoAsDone = async (id: Todo['id'], done: number) => {
  try {
    const [rows] = await pool.execute(
      'UPDATE `todos` SET `done` = ? WHERE `id` = ?;',
      [done, id]
    );

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
  markTodoAsDone,
  selectTodosBySearch,
};
