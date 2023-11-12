'use client';
import { CartItemShopFort, Error, Loading } from '@/app/components';
import { bgChecker } from '@/app/components/helper';
import { TItemsShop } from '@/app/types/type';
import { fortniteApiShop } from '@/core/service/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';

const ShopTemplate = () => {
    const { isLoading, isError, error, isSuccess, data } = useQuery({
        queryKey: ['fortniteShop'],

        queryFn: () => fortniteApiShop(),
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
        const { entries: shopData } = data.featured;

        const convertData = shopData.map((itemsData: any, index: number) => {
            return {
                bundle: itemsData.bundle,
                regularPrice: itemsData.regularPrice,
                finalPrice: itemsData.finalPrice,
                items: itemsData.items.map((itemsData: any) => {
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
                }),
                id: index
            };
        });

        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-xl ">Items Shop</span>
                </div>
                <div className="flex flex-col  bg-slate-100 rounded-md">
                    {convertData.map((dataAllData: any, index: number) => (
                        <div className="flex flex-col " key={dataAllData.id}>
                            <div className="flex flex-col bg-slate-100 p-2 rounded-md gap-3">
                                <div className="flex">
                                    {dataAllData.bundle && (
                                        <div className="p-1.5 text-sm font-semibold rounded-md bg-blue-300">
                                            <span>bundle</span>
                                        </div>
                                    )}
                                </div>
                                <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-3 rounded-xl ">
                                    {dataAllData.items.map((items: TItemsShop) => (
                                        <CartItemShopFort dataItem={items} key={items.id} />
                                    ))}
                                </div>
                                <div className="font-bold flex items-center gap-2">
                                    <span>price: </span>
                                    {dataAllData.finalPrice === dataAllData.regularPrice ? (
                                        <span className="font-medium text-sm">{dataAllData.regularPrice}</span>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="previous-price line-through text-gray-700">
                                                {dataAllData.regularPrice}
                                            </span>
                                            <span className="current-price">{dataAllData.finalPrice}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {convertData.length - 1 !== index && (
                                <hr className="w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default ShopTemplate;
