'use client';
import { CartItemShopFort, Error, Loading, NoData } from '@/app/components';
import { Tabs } from '@mantine/core';

import { bgChecker, colorChecker, paginateArray, removeDuplicateObjects } from '@/app/components/helper';
import { TItemsShop } from '@/app/types/type';
import { fortniteApiCosmeticsAll, fortniteApiCosmeticsNew, fortniteApiShop } from '@/core/service/api';
import { Pagination, Select } from '@mantine/core';
import { fortLogo } from '@public/picture';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Fortnite = () => {
    const [tab, setTab] = useState('shop');

    const [convertedDataAll, setConvertedDataAll] = useState<TItemsShop[]>([]);
    const [paginationAllItems, setPaginationAllItems] = useState<number>(1);
    const [pagesAllItems, setPagesAllItems] = useState<number>(0);
    const [selectAllItems, setSelectAllItems] = useState<string>('outfit');
    const [selectDataBoxAllItems, setSelectDataBoxAllItems] = useState<string[]>([]);

    const tabs = ['shop', 'NewCosmetics', 'AllCosmetics'];
    const {
        isLoading: isLoadingShop,
        isError: isErrorShop,
        error: errorShop,
        isSuccess: isSuccessShop,
        data: dataShop
    } = useQuery({
        queryKey: ['fortniteShop'],

        queryFn: () => fortniteApiShop(),
        retry: 1,
        retryOnMount: false,
        staleTime: 1200
    });

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

    const queryShopItem = () => {
        if (isLoadingShop) {
            return (
                <div className="w-full flex items-center justify-center">
                    <Loading />
                </div>
            );
        }

        if (isErrorShop) {
            toast.error(errorShop?.message);
            return (
                <div className="w-full flex items-center justify-center">
                    <Error />
                </div>
            );
        }

        if (isSuccessShop) {
            const { entries: shopData } = dataShop.featured;

            const convertData = shopData.map((itemsData: any, index: number) => {
                return {
                    bundle: itemsData.bundle,
                    regularPrice: itemsData.regularPrice,
                    finalPrice: itemsData.finalPrice,
                    items: itemsData.items.map((itemsShopData: any) => {
                        return {
                            name: itemsShopData.name,
                            description: itemsShopData.description,
                            type: itemsShopData.type.value,
                            rarity: {
                                name: itemsShopData.rarity.value,
                                bg: bgChecker(itemsShopData.rarity.value)
                                // color: colorChecker(itemsShopData.rarity.value)
                            },
                            shopHistory: itemsShopData.shopHistory || null,
                            images: itemsShopData.images.icon,
                            added: itemsShopData.added,
                            id: itemsShopData.id
                        };
                    }),
                    id: index
                };
            });

            return (
                <div className="flex flex-col  bg-slate-100 rounded-md">
                    {convertData.map((dataAllDataShop: any, index: number) => (
                        <div className="flex flex-col " key={dataAllDataShop.id}>
                            <div className="flex flex-col bg-slate-100 p-2 rounded-md gap-3">
                                <div className="flex">
                                    {dataAllDataShop.bundle && (
                                        <div className="p-1.5 text-sm font-semibold rounded-md bg-blue-300">
                                            <span>bundle</span>
                                        </div>
                                    )}
                                </div>
                                <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-3 rounded-xl ">
                                    {dataAllDataShop.items.map((items: TItemsShop) => (
                                        <CartItemShopFort dataItem={items} key={items.id} />
                                    ))}
                                </div>
                                <div className="font-bold flex items-center gap-2">
                                    <span>price: </span>
                                    {dataAllDataShop.finalPrice === dataAllDataShop.regularPrice ? (
                                        <span className="font-medium text-sm">{dataAllDataShop.regularPrice}</span>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="previous-price line-through text-gray-700">
                                                {dataAllDataShop.regularPrice}
                                            </span>
                                            <span className="current-price">{dataAllDataShop.finalPrice}</span>
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
            );
        }
    };

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
                <div className="grid  xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-5  gap-3 rounded-xl max-h-[500px] overflow-auto">
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
                        bg: bgChecker(itemsNewData.rarity.value)
                        // color: colorChecker(itemsNewData.rarity.value)
                    },
                    shopHistory: itemsNewData.shopHistory || null,

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
                                // color: colorChecker(itemsAllData.rarity.value),
                                bg: bgChecker(itemsAllData.rarity.value)
                            },
                            shopHistory: itemsAllData.shopHistory || null,
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

    return (
        <div className="container p-2 mx-auto h-screen  ">
            <div className="flex justify-center  ">
                <Image src={fortLogo.src} width={200} height={1} alt="" />
            </div>
            <div className="flex justify-start">
                <Tabs defaultValue={tab}>
                    <Tabs.List>
                        {tabs.map((itemsTab: string, index: number) => (
                            <Tabs.Tab
                                key={index}
                                value={itemsTab}
                                onClick={() => setTab(itemsTab)}
                                disabled={tab === itemsTab}
                            >
                                {itemsTab}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </div>
            <div className="flex flex-col gap-y-12 mt-8">
                {tab === 'shop' && (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-xl ">Items Shop</span>
                        </div>
                        {/* <hr /> */}
                        {queryShopItem()}
                    </div>
                )}
                {tab === 'NewCosmetics' && (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-xl ">New Items</span>
                        </div>
                        {/* <hr /> */}
                        {queryNewItem()}
                    </div>
                )}
                {tab === 'AllCosmetics' && (
                    <div className="flex flex-col gap-2 ">
                        <div className="flex items-center flex-wrap gap-2 justify-between">
                            <span className="font-bold text-xl ">All Items</span>

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
                )}
            </div>
        </div>
    );
};

export default Fortnite;
