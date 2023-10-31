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
    const [focused, setFocused] = useState<boolean>(false);
    return (
        <div className="min-h-screen flex flex-col w-full container items-center mx-auto py-5  ">
            <span className="text-2xl font-medium">Discord Status ... .. .</span>
            <form ref={formRef} onSubmit={searchSubmit}>
                <TextInput
                    type="number"
                    className="my-8"
                    placeholder="Enter Id User Discord"
                    size="lg"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    inputContainer={(children) => (
                        <Tooltip label="Please Enter Valid User Id" position="bottom-start" opened={focused}>
                            {children}
                        </Tooltip>
                    )}
                    // error="Something went wrong"
                    name="search"
                    withErrorStyles={false}
                    // rightSectionPointerEvents="none"
                    rightSection={
                        <div className="text-xl">
                            <button type="submit">
                                <IoSearch className="cursor-pointer" />
                            </button>
                        </div>
                    }
                />
            </form>

            <div className="bg-slate-100 w-full rounded-md p-5">{children}</div>
        </div>
    );
};

export default Wrapper;
