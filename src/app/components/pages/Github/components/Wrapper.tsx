'use client';
import React, { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { IoHomeOutline, IoSearch } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Wrapper = ({
    children,
    searchSubmit,
    formRef
}: {
    children: React.ReactNode;
    searchSubmit: any;
    formRef: any;
}) => {
    const searchParams = useSearchParams();
    const searchQueryParams = searchParams.get('search') || '';
    const [inputSearch, setInputSearch] = useState<string>();

    useEffect(() => {
        setInputSearch(searchQueryParams);
    }, [searchQueryParams]);
    return (
        <div className="w-[90%] sm:w-auto lg:h-screen flex flex-col  container items-center mx-auto py-4  ">
            <div className="flex items-center gap-2 flex-wrap">
                <VscGithub className="text-7xl font-medium" />
                <span className="text-2xl font-medium">Github Status</span>
            </div>
            <div className="flex items-center gap-x-2 my-4">
                <form className=" w-full sm:w-auto" ref={formRef} onSubmit={searchSubmit}>
                    <TextInput
                        type="text"
                        value={inputSearch || ''}
                        onChange={(e) => setInputSearch(e.target.value)}
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
                {searchQueryParams && (
                    <Link
                        href="/github"
                        className="p-3 text-black hover:text-red-600 cursor-pointer transition-all duration-500 bg-slate-300 rounded-md"
                    >
                        <IoHomeOutline className="text-2xl" />
                    </Link>
                )}
            </div>
            <div className="w-full flex flex-grow shadow-md  p-2 sm:p-5  bg-slate-100 relative overflow-auto rounded-md">
                {children}
            </div>
        </div>
    );
};

export default Wrapper;
