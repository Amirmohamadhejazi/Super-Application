'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { motion } from 'framer-motion';
import { BsFillTrash3Fill, BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { VscCheckAll } from 'react-icons/vsc';
import { HiCheckBadge } from 'react-icons/hi2';
import { AiOutlineAppstore } from 'react-icons/ai';
import { MdOutlineRestore } from 'react-icons/md';

import { TTodo, tabData } from './resources';
import { NoData } from '..';

const TodoApp = () => {
    // todoLists State
    const [todo, setTodo] = useState<TTodo[]>([]);

    // State input todoList
    const [task, setTask] = useState('');

    // tab State
    const [tab, setTab] = useState<number>(0);

    // State select box
    const [selectImportant, setSelectImportant] = useState<number>();

    const TabHandlerData = todo.filter((items) =>
        tab === 0 ? items : tab === 4 ? items.completed : items.important === tab && items.completed === false
    );

    // Add todoList
    const addTodo = (data: any) => {
        data.preventDefault();
        if (task.trim() !== '') {
            const currentDate = new Date();
            const dateCreate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}
            -${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

            let newData: TTodo;

            if (selectImportant) {
                newData = {
                    nameTodo: task,
                    createTime: dateCreate,
                    important: selectImportant,
                    completed: false,
                    id: new Date().getTime()
                };
                setTask('');
                setTodo([...todo, newData]);
                toast.success(`todo by id ${newData.id} Created`);
            } else {
                toast.error(`please select important type!`);
            }
        } else {
            setTask('');
            toast.error(`please enter todo!`);
        }
    };

    // Remove todo from todoList by Id
    const removeTodo = (index: number) => {
        const dataNew = todo.filter((items) => items.id !== index);
        toast.error(`todo by id ${index} deleted`);
        setTodo(dataNew);
    };

    // Remove All todos in todoList
    const removeAllTodo = () => {
        if (todo.length > 0) {
            setTodo([]);
            toast.error(`All todos deleted!`);
        }
    };

    // Edit todo to complete
    const addToCompleted = (index: number) => {
        toast.success(`todo by id ${index} completed`);
        return setTodo((prevTodo) => prevTodo.map((item) => (item.id === index ? { ...item, completed: true } : item)));
    };

    // Edit todo to complete
    const returnTodo = (index: number) => {
        toast.warning(`todo by id ${index} completed`);
        return setTodo((prevTodo) =>
            prevTodo.map((item) => (item.id === index ? { ...item, completed: false } : item))
        );
    };

    return (
        <div className={`w-full flex flex-col items-center ${tab !== 4 ? 'bg-[#C1D8C3]' : 'bg-[#6A9C89]'}`}>
            <div className="w-1/2 h-screen flex flex-col ">
                <h1 className="text-3xl font-semibold text-center mb-5 text-white">To-Do List</h1>

                <form className="flex space-x-2 whitespace-nowrap" onSubmit={(event) => addTodo(event)}>
                    <input
                        type="text"
                        placeholder="Enter a task..."
                        className="border border-blue-300 focus:ring-0 focus:outline-none rounded text-black w-full px-3 py-2"
                        value={task}
                        onChange={(event) => setTask(event.target.value)}
                    />

                    <select
                        required
                        className="select  select-secondary focus:ring-0 focus:outline-none w-full "
                        defaultValue={selectImportant}
                        onChange={(e) => setSelectImportant(+e.target.value)}
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
                        className="bg-blue-500 text-white px-4 focus:ring-0 focus:outline-none py-2 rounded hover:bg-blue-600 transition-all duration-200"
                        type="submit"
                    >
                        Add
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-500 text-white px-4 focus:ring-0 focus:outline-none py-2 rounded hover:bg-red-600 transition-all duration-200"
                        onClick={removeAllTodo}
                        type="button"
                    >
                        Delete All
                    </motion.button>
                </form>
                <div className="mt-5 flex flex-grow  flex-col gap-y-4  overflow-y-auto text-white  ">
                    <div className="tabs flex justify-between tabs-boxed bg-gray-200">
                        {tabData.map((items) => {
                            return (
                                <div
                                    className={`flex items-center gap-x-2 tab  ${
                                        items.id === tab ? 'text-white bg-[#141E46]' : 'text-black'
                                    } `}
                                    key={items.id}
                                    onClick={() => setTab(items.id)}
                                >
                                    <div className="text-yellow-400 text-xl">
                                        {items.id === 0 ? (
                                            <AiOutlineAppstore />
                                        ) : items.id === 1 ? (
                                            <BsStarFill />
                                        ) : items.id === 2 ? (
                                            <BsStarHalf />
                                        ) : items.id === 3 ? (
                                            <BsStar />
                                        ) : (
                                            items.id === 4 && <HiCheckBadge className="text-green-500" />
                                        )}
                                    </div>
                                    <span className="font-medium">{items.tabName}</span>
                                </div>
                            );
                        })}
                    </div>
                    {TabHandlerData.length > 0 ? (
                        TabHandlerData.map((todoItems) => (
                            <div
                                key={todoItems.id}
                                className={`grid grid-cols-3  items-center px-3 py-3 bg-[#3C486B]  rounded-md gap-x-10 `}
                            >
                                <div
                                    className="flex items-center gap-x-1 text-lg text-ellipsis overflow-hidden"
                                    title={todoItems.nameTodo}
                                >
                                    <div className="text-lg text-yellow-400 ">
                                        {todoItems.important === 1 ? (
                                            <BsStarFill />
                                        ) : todoItems.important === 2 ? (
                                            <BsStarHalf />
                                        ) : (
                                            todoItems.important === 3 && <BsStar />
                                        )}
                                    </div>
                                    <span>{todoItems.nameTodo}</span>
                                </div>
                                <span
                                    className="text-sm text-gray-400 text-ellipsis overflow-hidden"
                                    title={todoItems.createTime}
                                >
                                    {todoItems.createTime}
                                </span>
                                <div className="flex justify-end gap-x-2">
                                    {todoItems.completed === false && (
                                        <button
                                            className="text-green-500 transition-all duration-300 hover:text-green-700 "
                                            onClick={() => addToCompleted(todoItems.id)}
                                        >
                                            <VscCheckAll className="text-xl  " />
                                        </button>
                                    )}
                                    {todoItems.completed === true && (
                                        <button
                                            className="text-yellow-500 transition-all duration-300 hover:text-yellow-500 "
                                            onClick={() => returnTodo(todoItems.id)}
                                        >
                                            <MdOutlineRestore className="text-2xl" />
                                        </button>
                                    )}
                                    <button
                                        className="text-red-500 transition-all duration-300 hover:text-red-700 "
                                        onClick={() => removeTodo(todoItems.id)}
                                    >
                                        <BsFillTrash3Fill className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className=" rounded-md bg-gray-200">
                            <NoData text={`No data from ${tabData[tab].tabName} filter!`} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoApp;
