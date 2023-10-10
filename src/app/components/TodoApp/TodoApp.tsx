'use client';
import React, { useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    const addTodo = (e) => {
        e.preventDefault();

        setTodos([...todos, task]);
    };

    const removeTodo = (index) => {
        const newData = [...todos];
        newData.splice(index, 1);
        setTodos(newData);
    };
    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl font-semibold text-center mb-5 text-blue-600">To-Do List</h1>

            <form className="flex space-x-2" onSubmit={(e) => addTodo(e)}>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    className="border border-blue-300 rounded w-full px-3 py-2"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
                    Add
                </button>
            </form>
            <ul className="mt-5">
                {todos.map((todo, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-lg">{todo}</span>
                        <button className="text-red-500 hover:text-red-600" onClick={() => removeTodo(index)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
