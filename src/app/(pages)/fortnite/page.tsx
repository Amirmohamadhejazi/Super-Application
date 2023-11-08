'use client';
import { CartItemShopFort, Error, Loading, NoData } from '@/app/components';
import { colorChecker, paginateArray, removeDuplicateObjects } from '@/app/components/helper';
import { TItemsShop } from '@/app/types/type';
import { fortniteApiCosmeticsAll, fortniteApiCosmeticsNew } from '@/core/service/api';
import { Pagination, Select } from '@mantine/core';
import { fortLogo } from '@public/picture';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Fortnite = () => {
    const [convertedDataAll, setConvertedDataAll] = useState<TItemsShop[]>([]);
    const [paginationAllItems, setPaginationAllItems] = useState<number>(1);
    const [pagesAllItems, setPagesAllItems] = useState<number>(0);
    const [selectAllItems, setSelectAllItems] = useState<string>('outfit');
    const [selectDataBoxAllItems, setSelectDataBoxAllItems] = useState<string[]>([]);

    const {
        isLoading: isLoadingAll,
        isError: isErrorAll,
        error: errorAll,
        isSuccess: isSuccessAll,
        data: dataAll
    } = useQuery({
        queryKey: ['fortniteAll'],

        queryFn: () => fortniteApiCosmeticsAll(),

        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    useEffect(() => {
        if (isSuccessAll === true) {
            const { data } = dataAll;
            if (data) {
                let selectDataBoxAllData = removeDuplicateObjects(data.map((items: any) => items?.type?.value));
                const convertedData = data
                    .filter((itemsForFilter: any) => itemsForFilter.type.value === selectAllItems)
                    .map((itemsAllData: any) => {
                        return {
                            name: itemsAllData.name,
                            description: itemsAllData.description,
                            type: itemsAllData.type.value,
                            rarity: {
                                name: itemsAllData.rarity.value,
                                color: colorChecker(itemsAllData.rarity.value)
                            },
                            images: itemsAllData.images.icon,
                            added: itemsAllData.added,
                            id: itemsAllData.id
                        };
                    });
                const pages = Math.ceil(convertedData.length / 50);

                setConvertedDataAll(convertedData);
                setPagesAllItems(pages);
                setSelectDataBoxAllItems(selectDataBoxAllData);
            }
        }
    }, [isSuccessAll, selectAllItems]);

    const {
        isLoading: isLoadingNew,
        isError: isErrorNew,
        error: errorNew,
        isSuccess: isSuccessNew,
        data: dataNew
    } = useQuery({
        queryKey: ['fortniteNew'],

        queryFn: () => fortniteApiCosmeticsNew(),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    const queryAllItem = () => {
        if (isLoadingAll) {
            return (
                <div className="w-full flex items-center justify-center">
                    <Loading />
                </div>
            );
        }

        if (isErrorAll) {
            toast.error(errorAll?.message);
            return (
                <div className="w-full flex items-center justify-center">
                    <Error />
                </div>
            );
        }

        if (isSuccessAll) {
            const { data } = dataAll;

            if (data.length === 0) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <NoData text="No Data!" />
                    </div>
                );
            }

            const paginatedData = paginateArray(convertedDataAll, 50, paginationAllItems);

            return (
                <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-3 rounded-xl max-h-[500px] overflow-auto">
                    {paginatedData?.map((items: TItemsShop) => (
                        <CartItemShopFort dataItem={items} key={items.id} />
                    ))}
                </div>
            );
        }
    };

    const queryNewItem = () => {
        if (isLoadingNew) {
            return (
                <div className="w-full flex items-center justify-center">
                    <Loading />
                </div>
            );
        }

        if (isErrorNew) {
            toast.error(errorNew?.message);
            return (
                <div className="w-full flex items-center justify-center">
                    <Error />
                </div>
            );
        }

        if (isSuccessNew) {
            const { items } = dataNew;
            if (items.length === 0) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <NoData text="No Data!" />
                    </div>
                );
            }

            const convertedData = items.map((itemsNewData: any) => {
                return {
                    name: itemsNewData.name,
                    description: itemsNewData.description,
                    type: itemsNewData.type.value,
                    rarity: {
                        name: itemsNewData.rarity.value,
                        color: colorChecker(itemsNewData.rarity.value)
                    },
                    images: itemsNewData.images.icon,
                    added: itemsNewData.added,
                    id: itemsNewData.id
                };
            });

            return (
                <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-3 rounded-xl max-h-[500px] overflow-auto">
                    {convertedData.map((items: TItemsShop) => (
                        <CartItemShopFort dataItem={items} key={items.id} />
                    ))}
                </div>
            );
        }
    };

    return (
        <div className= "container p-2 mx-auto h-screen  ">
            <div className="flex justify-center  ">
                <Image src={fortLogo.src} width={200} height={1} alt="" />
            </div>

            <div className="flex flex-col gap-y-12">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">New Items</span>
                        {/* <div className="flex justify-center">
                            <Pagination
                                total={10}
                                value={2}
                                 color="orange"
                                size="sm"
                            />
                        </div> */}
                    </div>
                    <hr />
                    {queryNewItem()}
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center flex-wrap gap-2 justify-between">
                        <span className="font-semibold">All Items</span>

                        {pagesAllItems > 1 && (
                            <div className="flex items-center justify-center">
                                <Pagination
                                    total={pagesAllItems}
                                    value={paginationAllItems}
                                    onChange={setPaginationAllItems}
                                    color="orange"
                                    size="sm"
                                />
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className="flex flex-col">
                        <div className="flex justify-end">
                            <Select
                                size="sm"
                                placeholder="Sort by:"
                                data={selectDataBoxAllItems}
                                onChange={(e: any) => {
                                    setSelectAllItems(e);
                                    setPaginationAllItems(1);
                                }}
                                value={selectAllItems}
                                searchable
                            />
                        </div>
                    </div>
                    {queryAllItem()}
                </div>
            </div>
        </div>
    );
};

export default Fortnite;
