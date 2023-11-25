'use client';

import { TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface Person {
    name: string;
    expense: number;
}

const ExpensesCalculator: React.FC = () => {
    const [inputData, setInputData] = useState<Person>({ name: '', expense: 0 });
    const [people, setPeople] = useState<Person[]>([]);
    const [total, setTotal] = useState<number>(0);
    const addHandler = (e: any) => {
        e.preventDefault();
        if (!people.find((items) => items.name === inputData.name) && inputData.expense > 0) {
            setPeople([...people, inputData]);
        }
    };

    useEffect(() => {
        if (people.length > 0) {
            setTotal(people?.map((items: Person) => items?.expense)?.reduce((itemsA, itemsB) => itemsA + itemsB));
        }
        console.log(people);
    }, [people]);

    return (
        <div className="container mx-auto ">
            <form className=" pt-8 flex flex-col gap-2 items-center w-full sm:w-auto" onSubmit={addHandler}>
                <TextInput
                    type="text"
                    placeholder="Enter name!"
                    size="lg"
                    name="name"
                    withErrorStyles={false}
                    onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
                    value={inputData.name}
                />
                <TextInput
                    type="number"
                    placeholder="Enter pay!"
                    size="lg"
                    name="search"
                    value={inputData.expense}
                    onChange={(e) => setInputData({ ...inputData, expense: +e.target.value })}
                    withErrorStyles={false}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">Add</button>
            </form>

            <div className="flex flex-col gap-2">
                <span>Total Expense: {total}</span>
                {people.map((itemsPeople: any, index) => (
                    <div className="flex flex-col" key={index}>
                        <span>name: {itemsPeople.name}</span>
                        <span>expense: {itemsPeople.expense}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensesCalculator;
