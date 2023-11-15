'use client';
import React, { useRef, useState } from 'react';
import { TextInput } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';
import { useQuery } from '@tanstack/react-query';
import { fortniteApiCosmeticsSearchByName } from '@/core/service/api/fortnite/fortnite.api';
import { CartItemShopFort, Error, Loading, NoData } from '../..';
import { toast } from 'react-toastify';
import { bgChecker } from '../../helper';
import { TItemsShop } from '@/app/types/type';

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

        queryFn: () => inputSearch && fortniteApiCosmeticsSearchByName(inputSearch),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    const searchHandler = () => {
        if (isLoading) {
            return (
                <div className="w-full flex items-center justify-center">
                    <Loading />
                </div>
            );
        }

        if (isError) {
            // toast.error(error?.message);
            return (
                <div className="w-full flex items-center justify-center">
                    <Error />
                </div>
            );
        }

        if (isSuccess) {
            if (!data) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <NoData text="data Not found!" />
                    </div>
                );
            }
            console.log(data);

            const convertData: TItemsShop[] = data.map((itemsSearch: any) => {
                return {
                    name: itemsSearch.name,
                    description: itemsSearch.description,
                    type: itemsSearch.type.value,
                    rarity: {
                        name: itemsSearch.rarity.value,
                        bg: bgChecker(itemsSearch.rarity.value)
                    },
                    shopHistory: itemsSearch.shopHistory || null,
                    images: itemsSearch.images.icon,
                    added: itemsSearch.added,
                    id: itemsSearch.id
                };
            });
            return (
                <div className="flex flex-col">
                    <hr className="my-5" />
                    <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-3 rounded-xl ">
                        {convertData.map((itemsConverted) => (
                            <CartItemShopFort dataItem={itemsConverted} key={itemsConverted.id} />
                        ))}
                    </div>
                </div>
            );
        }
    };
    return (
        <div className="w-full  flex flex-col  container items-center mx-auto ">
            <form className=" w-full sm:w-auto" ref={formRef} onSubmit={searchSubmit}>
                <TextInput
                    type="text"
                    placeholder="Enter item Fortnite!"
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
            {searchHandler()}
        </div>
    );
};

export default SearchCosmetics;
