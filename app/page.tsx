"use client"

import { getTodosAction, addTodoAction, toggleTodoAction, deleteTodoAction } from './actions'
import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState<any>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const result = await getTodosAction();
    setTodos(result);
  };

  const addTodo = async (e: any) => {
    e.preventDefault();
    if (!input) return;
    const result = await addTodoAction({input: input});
    setTodos([result, ...todos]);
    setInput('');
  };

  const toggleTodo = async ({id, completed}: {id: number, completed: boolean}) => {
    const result = await toggleTodoAction({id: id, completed: completed});
    setTodos(todos.map((t: any) => t.id === id ? result : t));
  };

  const deleteTodo = async (id: number) => {
    await deleteTodoAction({id: id});
    setTodos(todos.filter((t: any) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Task Master</h1>
      <form onSubmit={addTodo} className="flex gap-2 mb-6 w-full max-w-md">
        <input 
          className="flex-1 p-2 border-1 text-black border-solid rounded shadow-sm"
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button className="bg-indigo-500 text-white px-4 border-1 border-solid py-2 rounded hover:bg-indigo-600">Add</button>
      </form>
      <div className="w-full max-w-md space-y-3">
        {todos.map((todo: any) => (
          <div key={todo.id} className="bg-white p-4 text-black border-1 rounded shadow flex justify-between items-center">
            <span 
              onClick={() => toggleTodo({id: todo.id, completed: todo.completed})}
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
