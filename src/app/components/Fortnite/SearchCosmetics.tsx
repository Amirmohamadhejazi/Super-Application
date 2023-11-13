'use client';
import React, { useRef, useState } from 'react';
import { TextInput } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';
import { useQuery } from '@tanstack/react-query';
import { fortniteApiCosmeticsSearchByName } from '@/core/service/api/fortnite/fortnite.api';

const SearchCosmetics = () => {
    const formRef = useRef<any>(null);

    const [inputSearch, setInputSearch] = useState<string>('');

    const searchSubmit = (e: any) => {
        e.preventDefault();
        const dataInput: any = Object.fromEntries(new FormData(formRef.current).entries()).search;
        if (dataInput.trim().length !== 0) {
            setInputSearch(dataInput);
        }
    };
    // search first
    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['searchUserQuery', { inputSearch }],

        queryFn: () => inputSearch && fortniteApiCosmeticsSearchByName({name:inputSearch}),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    console.log(data);

    return (
        <div className="w-full  flex flex-col  container items-center mx-auto ">
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
            <div className="w-full flex flex-grow shadow-md p-5  bg-slate-100 relative overflow-auto rounded-md">s</div>
        </div>
    );
};

export default SearchCosmetics;
