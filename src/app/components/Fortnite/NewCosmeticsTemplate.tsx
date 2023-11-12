'use client';
import { CartItemShopFort, Error, Loading, NoData } from '@/app/components';
import { bgChecker } from '@/app/components/helper';
import { TItemsShop } from '@/app/types/type';
import { fortniteApiCosmeticsNew } from '@/core/service/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const NewCosmeticsTemplate = () => {
    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['fortniteNew'],

        queryFn: () => fortniteApiCosmeticsNew(),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

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
        const { items } = data;

        if (items.length === 0) {
            return (
                <div className="w-full flex items-center justify-center">
                    <NoData text="No Data!" />
                </div>
            );
        }

        const convertedData = items.map((itemsData: any) => {
            return {
                name: itemsData.name,
                description: itemsData.description,
                type: itemsData.type.value,
                rarity: {
                    name: itemsData.rarity.value,
                    bg: bgChecker(itemsData.rarity.value)
                    // color: colorChecker(itemsData.rarity.value)
                },
                shopHistory: itemsData.shopHistory || null,

                images: itemsData.images.icon,
                added: itemsData.added,
                id: itemsData.id
            };
        });

        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl ">New Items</span>
                </div>
                <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-3 rounded-xl max-h-[500px] overflow-auto">
                    {convertedData.map((items: TItemsShop) => (
                        <CartItemShopFort dataItem={items} key={items.id} />
                    ))}
                </div>
            </div>
        );
    }
};

export default NewCosmeticsTemplate;
