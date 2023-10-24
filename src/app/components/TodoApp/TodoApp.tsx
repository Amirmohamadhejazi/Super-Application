'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { AnimatePresence, motion } from 'framer-motion';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';

interface ITodo {
    nameTodo: string;
    createTime: string;
    important: string;
    id: number;
}

const TodoApp = () => {
    const [todo, setTodo] = useState<ITodo[]>([]);
    const [task, setTask] = useState('');
    const [selectImportant, setSelectImportant] = useState<string>('1');
    console.log(todo);

    const addTodo = (data: any) => {
        data.preventDefault();
        if (task.trim() !== '') {
            const currentDate = new Date();
            const dateCreate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}
        -${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

            const newData: ITodo = {
                nameTodo: task,
                createTime: dateCreate,
                important: selectImportant ? selectImportant : '1',
                id: new Date().getTime()
            };
            setTask('');
            setTodo([...todo, newData]);
            toast.success(`todo by id ${newData.id} Created`);
        } else {
            setTask('');
            toast.error(`please enter todo!`);
        }
    };

    const removeTodo = (index: number) => {
        const dataNew = todo.filter((items) => items.id !== index);
        toast.error(`todo by id ${index} deleted`);
        setTodo(dataNew);
    };
    const removeAllTodo = () => {
        if (todo.length > 0) {
            setTodo([]);
            toast.error(`All todos deleted!`);
        }
    };

    return (
        <div className="h-screen w-1/2 flex flex-col items-center ">
            <h1 className="text-3xl font-semibold text-center mb-5 text-blue-600">To-Do List</h1>

            <form className="flex space-x-2 whitespace-nowrap" onSubmit={(event) => addTodo(event)}>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    className="border border-blue-300 rounded text-black w-full px-3 py-2"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
                <select
                    className="select select-bordered w-full max-w-xs"
                    defaultValue={selectImportant}
                    onChange={(e) => setSelectImportant(e.target.value)}
                >
                    <option disabled selected>
                        How important is it?
                    </option>
                    <option value={1}>It is important</option>
                    <option value={2}>Its importance is moderate</option>
                    <option value={3}>No matter</option>
                </select>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                    type="submit"
                >
                    Add
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-200"
                    onClick={removeAllTodo}
                    type="button"
                >
                    Delete All
                </motion.button>
            </form>
            <div className="mt-5 flex flex-grow  flex-col gap-y-4  overflow-y-auto text-white">
                <AnimatePresence>
                    {todo.map((todoItems) => (
                        <motion.div
                            layout
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring' }}
                            key={todoItems.id}
                            className={`grid grid-cols-3  items-center px-3 py-3 bg-[#3C486B] rounded-md gap-x-10 `}
                        >
                            <div
                                className="flex items-center gap-x-1 text-lg text-ellipsis overflow-hidden"
                                title={todoItems.nameTodo}
                            >
                                <AiOutlineStar
                                    className={`text-lg  ${
                                        todoItems.important === '1'
                                            ? 'text-yellow-400'
                                            : todoItems.important === '2'
                                            ? 'text-yellow-600'
                                            : todoItems.important === '3' && 'text-yellow-800'
                                    }`}
                                />
                                <span>{todoItems.nameTodo}</span>
                            </div>
                            <span
                                className="text-sm text-gray-400 text-ellipsis overflow-hidden"
                                title={todoItems.createTime}
                            >
                                {todoItems.createTime}
                            </span>
                            <div className="flex justify-end">
                                <button
                                    className="text-red-300 transition-all duration-300 hover:text-red-600 "
                                    onClick={() => removeTodo(todoItems.id)}
                                >
                                    <BsFillTrash3Fill className="text-xl" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TodoApp;
