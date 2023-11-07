'use client';
import { Error, Loading, NoData } from '@/app/components';

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { calculator } from './components/utils/calculator';
import { fortniteApiCosmeticsAll, fortniteApiCosmeticsNew, fortniteApiShop } from '@/core/service/api';
import Link from 'next/link';
import { paginateArray, removeDuplicateObjects } from '@/app/components/helper';
import { Pagination, Select } from '@mantine/core';
import Image from 'next/image';

const Fort = () => {
    const [pageAllData, setPageAllData] = useState(1);
    const [typeAllSelect, setTypeAllSelect] = useState('outfit');
    console.log(typeAllSelect);

    const [dataSelectBoxAllData, setDataSelectBoxAllData] = useState([]);
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
        if (dataAll) {
            let selectDataBoxAllData = removeDuplicateObjects(dataAll?.data?.map((items: any) => items?.type?.value));
            setDataSelectBoxAllData(selectDataBoxAllData);
        }
    }, [dataAll]);
    const shopHandler = () => {
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
            const { name: nameConvertData, data: DataConvert } = calculator(dataShop.featured);
            console.log(DataConvert);

            // if (!data) {
            //     return (
            //         <Wrapper searchSubmit={searchSubmit} formRef={formRef}>
            //             <div className="w-full flex items-center justify-center">
            //                 <NoData text="User Not Found!" />
            //             </div>
            //         </Wrapper>
            //     );
            // }
            return (
                <>
                    <span className="text-xl font-semibold">{nameConvertData}</span>

                    <hr className="my-2" />

                    {DataConvert.length}
                </>
            );
        }
    };
    const newDataHandler = () => {
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
            if (dataNew.items.length === 0) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <NoData text="No Data!" />
                    </div>
                );
            }

            const colorChecker = (nameColor: string) => {
                switch (nameColor) {
                    case 'common':
                        return '#40464d';
                    case 'uncommon':
                        return '#016604';
                    case 'rare':
                        return '#008DD4';
                    case 'epic':
                        return '#8A2BE2';
                    case 'legendary':
                        return '#de6e0e';
                    case 'mythic':
                        return '#B8860b';
                    case 'exotic':
                        return '#62bdbd';
                    default:
                        break;
                }
            };
            const convertedData = dataNew.items.map((itemsNewData: any) => {
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
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-1 gap-3 rounded-xl max-h-[500px] overflow-auto">
                        {convertedData.map((items: any) => (
                            <a href={`fortnite/${items.id}`} target="_blank" key={items.id}>
                                <div className="flex flex-col rounded-md overflow-hidden p-1  shadow-lg bg-gray-200 relative">
                                    <div
                                        className="p-1 rounded-full absolute top-3 right-3"
                                        style={{ background: items.rarity.color }}
                                    />
                                    <div className="bg-gray-300 rounded-md">
                                        <img src={items.images} className="w-full object-cover" alt="" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1 text-sm font-medium p-1">
                                        <span className="font-semibold"> {items.name}</span>
                                        <span
                                            className="px-2 py-1 text-white rounded-md  text-xs"
                                            style={{ background: items.rarity.color }}
                                        >
                                            {' '}
                                            {items.type}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </>
            );
        }
    };
    const allDataHandler = () => {
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
            if (!dataAll?.data || dataAll?.data.length === 0) {
                return (
                    <div className="w-full flex items-center justify-center">
                        <NoData text="No Data!" />
                    </div>
                );
            }

            const colorChecker = (nameColor: string) => {
                switch (nameColor) {
                    case 'common':
                        return '#40464d';
                    case 'uncommon':
                        return '#016604';
                    case 'rare':
                        return '#008DD4';
                    case 'epic':
                        return '#8A2BE2';
                    case 'legendary':
                        return '#de6e0e';
                    case 'mythic':
                        return '#B8860b';
                    case 'exotic':
                        return '#62bdbd';
                    default:
                        break;
                }
            };
            const DataFiltered = dataAll.data.filter((items: any) => items.type.value === typeAllSelect);

            const itemsPerPage = 50;
            const pages = Math.ceil(DataFiltered.length / itemsPerPage);
            const paginatedData = paginateArray(DataFiltered, itemsPerPage, pageAllData);

            const convertedData = paginatedData?.map((itemsAllData: any) => {
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

            // let testData = DataFiltered.map((itemsData: any) => itemsData.rarity.value);
            console.log(DataFiltered);

            return (
                <>
                    {pages > 1 && (
                        <div className="flex justify-center">
                            <Pagination
                                total={pages}
                                value={pageAllData}
                                onChange={setPageAllData}
                                color="orange"
                                size="sm"
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-1 gap-3 rounded-xl max-h-[700px] overflow-auto">
                        {convertedData?.map((items: any) => (
                            <a href={`fortnite/${items.id}`} target="_blank" key={items.id}>
                                <div className="flex flex-col rounded-md overflow-hidden p-1  shadow-lg bg-gray-200 relative">
                                    <div
                                        className="p-1 rounded-full absolute top-3 right-3"
                                        style={{ background: items.rarity.color }}
                                    />
                                    <div className="bg-gray-300 rounded-md">
                                        <img src={items.images} className="w-full object-cover" alt="" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1 text-sm font-medium p-1">
                                        <span className="font-semibold"> {items.name}</span>
                                        <span
                                            className="px-2 py-1 text-white rounded-md  text-xs"
                                            style={{ background: items.rarity.color }}
                                        >
                                            {' '}
                                            {items.type}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </>
            );
        }
    };

    return (
        <div className="container flex gap-y-5 flex-col px-2 sm:px-0 mx-auto  ">
            {/* {shopHandler()} */}

            <div className="flex flex-col">
                <span className="text-xl font-semibold">New items</span>

                <hr className="my-2" />
                {newDataHandler()}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">All items</span>
                    <div className="flex">
                        <Select
                            size="sm"
                            placeholder="Sort by:"
                            data={dataSelectBoxAllData}
                            onChange={(e: any) => {
                                setTypeAllSelect(e);
                            }}
                            value={typeAllSelect}
                            searchable
                        />
                    </div>
                </div>

                <hr className="my-2" />
                {allDataHandler()}
            </div>
        </div>
    );
};

export default Fort;
