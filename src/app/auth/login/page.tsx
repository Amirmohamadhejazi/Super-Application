'use client';
import React, { useState } from 'react';
type TStateForms = { name: string; password: string };
const Login = () => {
    const [forms, setForms] = useState<TStateForms>({ name: '', password: '' });

    const formHandler = async (e) => {
        e.preventDefault();
        console.log(forms);

        const response = await fetch('/api/items/list', {
            method: 'POST',
            body: forms
        });
        const result = await response.json();

        console.log(result);
    };
    return (
        <div className="flex justify-center bg-blue-600 h-screen">
            <div className="flex flex-col gap-y-2 ">
                <form onSubmit={formHandler}>
                    <div className="flex flex-col">
                        <label htmlFor="name">name</label>
                        <input
                            type="text"
                            name={'name'}
                            value={forms.name}
                            onChange={(e) => setForms({ ...forms, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">password</label>
                        <input
                            type="text"
                            name={'password'}
                            value={forms.password}
                            onChange={(e) => setForms({ ...forms, password: e.target.value })}
                        />
                    </div>

                    <button className="btn bg-red-700 w-full h-8 rounded-md mt-5" type="submit">
                        sumbit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
