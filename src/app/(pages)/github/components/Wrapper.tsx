'use client';
import React, { useState } from 'react';
import { TextInput, Tooltip } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';

const Wrapper = ({
    children,
    searchSubmit,
    formRef
}: {
    children: React.ReactNode;
    searchSubmit: any;
    formRef: any;
}) => { 
    return (
        <div className="h-[200vh] lg:h-screen flex flex-col w-full container items-center mx-auto py-5  ">
            <span className="text-2xl font-medium">Github Status ... .. .</span>
            <form ref={formRef} onSubmit={searchSubmit}>
                <TextInput
                    type="text"
                    className="my-8"
                    placeholder="Enter User Name Github"
                    size="lg" 
                    name="search"
                    withErrorStyles={false}
                    rightSection={
                        <div className="text-xl">
                            <button type="submit">
                                <IoSearch className="cursor-pointer" />
                            </button>
                        </div>
                    }
                />
            </form>
            <div className="w-full flex flex-grow shadow-md p-5 bg-slate-100 relative overflow-auto rounded-md">{children}</div> 
        </div>
    );
};

export default Wrapper;
