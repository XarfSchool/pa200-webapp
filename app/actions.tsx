"use server";

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function getTodosAction() {
  const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
  return result.rows;
}

export async function addTodoAction({input} : {input: string}) {
  const result = await pool.query(
      'INSERT INTO todos (task) VALUES ($1) RETURNING *',
      [input]
  );
  return result.rows[0];
}

export async function toggleTodoAction({id, completed} : {id: number, completed: boolean}) {
  const result = await pool.query(
     'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
     [!completed, id]
  );
  return result.rows[0];
}

export async function deleteTodoAction({id} : {id: number}) {
  await pool.query('DELETE FROM todos WHERE id = $1', [id])
}
