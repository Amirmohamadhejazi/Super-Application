import { dataItems } from '@/app/data/data';
import { TItemsShop } from '@/app/types/type';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';

const CartItemShopFort = ({
    dataItem = {
        name: 'name',
        description: 'description',
        type: 'type',
        rarity: {
            name: 'name',
            bg: {
                color: null,
                bg: null
            }
        },
        shopHistory: null,
        images: 'images',
        added: 'added',
        id: 'id'
    }
}: {
    dataItem?: TItemsShop;
}) => {
    return (
        // <Link href={`./fortnite/${dataItem.id}`}>
        <div className="flex flex-col rounded-md overflow-hidden p-1  shadow-lg bg-gray-200 relative">
            <div
                className=" rounded-md min-h-[150px] object-cover bg-no-repeat"
                style={{
                    background: `${
                        dataItem.rarity.bg.bg ? `url('${dataItem?.rarity?.bg?.bg?.src}')` : dataItem.rarity.bg.color
                    }`
                }}
            >
                <img src={dataItem.images} className="w-full object-cover " alt="" />
            </div>
            <div className="flex flex-col items-start gap-1 text-sm font-medium p-1">
                <span className="font-semibold"> {dataItem.name}</span>
                <span
                    className="px-2 py-1 text-white rounded-md  text-xs bg-no-repeat"
                    style={{
                        background: `${
                            dataItem.rarity.bg.bg ? `url('${dataItem?.rarity?.bg?.bg?.src}')` : dataItem.rarity.bg.color
                        }`
                    }}
                >
                    {' '}
                    {dataItem.type}
                </span>
            </div>
            <div className="flex flex-col gap-1 max-h-[50px] font-semibold text-sm rounded-md">
                <div className="flex items-center justify-between gap-1">
                    <span>Release:</span>
                    <span>
                        {dataItem?.shopHistory ? format(new Date(dataItem?.shopHistory[0]), 'yyyy-MM-dd') : '----'}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-1 ">
                    <span>Last:</span>
                    <span>
                        {dataItem?.shopHistory
                            ? format(new Date(dataItem?.shopHistory[dataItem?.shopHistory.length - 1]), 'yyyy-MM-dd')
                            : '----'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItemShopFort;
