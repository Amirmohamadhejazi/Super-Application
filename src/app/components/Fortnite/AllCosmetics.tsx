'use client';
import { CartItemShopFort, Error, Loading, NoData } from '@/app/components';
import { bgChecker, paginateArray, removeDuplicateObjects } from '@/app/components/helper';
import { TItemsShop } from '@/app/types/type';
import { fortniteApiCosmeticsAll } from '@/core/service/api';
import { Pagination, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AllCosmetics = () => {
    const [convertedData, setConvertedData] = useState<TItemsShop[]>([]);
    const [paginationItems, setPaginationItems] = useState<number>(1);
    const [pagesItems, setPagesItems] = useState<number>(0);
    const [selectItems, setSelectItems] = useState<string>('outfit');
    const [selectDataBoxItems, setSelectDataBoxItems] = useState<string[]>([]);

    const {
        isLoading,
        isError,
        error,
        isSuccess,
        data: dataAll
    } = useQuery({
        queryKey: ['fortnite'],

        queryFn: () => fortniteApiCosmeticsAll(),

        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

    useEffect(() => {
        if (isSuccess === true) {
            const { data } = dataAll;
            if (data) {
                let selectDataBoxData = removeDuplicateObjects(data.map((items: any) => items?.type?.value));

                const convertedData = data
                    .filter((itemsForFilter: any) => itemsForFilter.type.value === selectItems)
                    .map((itemsData: any) => {
                        return {
                            name: itemsData.name,
                            description: itemsData.description,
                            type: itemsData.type.value,
                            rarity: {
                                name: itemsData.rarity.value,
                                // color: colorChecker(itemsData.rarity.value),
                                bg: bgChecker(itemsData.rarity.value)
                            },
                            shopHistory: itemsData.shopHistory || null,
                            images: itemsData.images.icon,
                            added: itemsData.added,
                            id: itemsData.id
                        };
                    });
                const pages = Math.ceil(convertedData.length / 50);

                setConvertedData(convertedData);
                setPagesItems(pages);
                setSelectDataBoxItems(selectDataBoxData);
            }
        }
    }, [isSuccess, selectItems]);
    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (isError) {
        toast.error(error?.message);
        return (
            <div className="w-full flex items-center justify-center">
                <Error />
            </div>
        );
    }

    if (isSuccess) {
        const { data } = dataAll;

        if (data.length === 0) {
            return (
                <div className="w-full flex items-center justify-center">
                    <NoData text="No Data!" />
                </div>
            );
        }

        const paginatedData = paginateArray(convertedData, 50, paginationItems);

        return (
            <div className="flex flex-col gap-2 ">
                <div className="flex items-center flex-wrap gap-2 justify-between">
                    <span className="font-bold text-xl ">All Items</span>

                    {pagesItems > 1 && (
                        <div className="flex items-center justify-center">
                            <Pagination
                                total={pagesItems}
                                value={paginationItems}
                                onChange={setPaginationItems}
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
                            data={selectDataBoxItems}
                            onChange={(e: any) => {
                                setSelectItems(e);
                                setPaginationItems(1);
                            }}
                            value={selectItems}
                            searchable
                        />
                    </div>
                </div>
                <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-5  gap-3 rounded-xl max-h-[500px] overflow-auto">
                    {paginatedData?.map((items: TItemsShop) => (
                        <CartItemShopFort dataItem={items} key={items.id} />
                    ))}
                </div>
            </div>
        );
    }
};

export default AllCosmetics;
