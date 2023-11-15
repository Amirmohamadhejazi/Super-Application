'use client';
import React from 'react';
import { TextInput } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';

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
        <div className="w-[90%] sm:w-auto lg:h-screen flex flex-col  container items-center mx-auto py-4  ">
            <div className="flex items-center gap-2 flex-wrap">
                <VscGithub className="text-7xl font-medium" />
                <span className="text-2xl font-medium">Github Status</span>
            </div>
            <form className=" w-full sm:w-auto" ref={formRef} onSubmit={searchSubmit}>
                <TextInput
                    type="text"
                    className="my-4"
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
            <div className="w-full flex flex-grow shadow-md p-5  bg-slate-100 relative overflow-auto rounded-md">
                {children}
            </div>
        </div>
    );
};

export default Wrapper;
