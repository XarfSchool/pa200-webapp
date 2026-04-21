import React, { useState, useEffect } from 'react';
import Pool from 'pg';

const DATABASE_URL='postgresql://postgres:password@10.0.2.4:5432/postgres';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    setTodos(await pool.query('SELECT * FROM todos ORDER BY created_at DESC'));
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input) return;
    const result = await pool.query(
      'INSERT INTO todos (task) VALUES ($1) RETURNING *',
      [input]
    );
    setTodos([result.rows[0], ...todos]);
    setInput('');
  };

  const toggleTodo = async (id, completed) => {
    const result = await pool.query(
      'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );
    setTodos(todos.map(t => t.id === id ? result.rows[0] : t));
  };

  const deleteTodo = async (id) => {
    await pool.query('DELETE FROM todos WHERE id = $1', [id])
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Task Master</h1>
      <form onSubmit={addTodo} className="flex gap-2 mb-6 w-full max-w-md">
        <input 
          className="flex-1 p-2 border-1 border-solid rounded shadow-sm"
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button className="bg-indigo-500 text-white px-4 border-1 border-solid py-2 rounded hover:bg-indigo-600">Add</button>
      </form>
      <div className="w-full max-w-md space-y-3">
        {todos.map(todo => (
          <div key={todo.id} className="bg-white p-4 border-1 rounded shadow flex justify-between items-center">
            <span 
              onClick={() => toggleTodo(todo.id, todo.completed)}
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
