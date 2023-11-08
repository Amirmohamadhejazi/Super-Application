import { TItemsShop } from '@/app/types/type';
import React from 'react';

const CartItemShopFort = ({
    dataItem = {
        name: 'name',
        description: 'description',
        type: 'type',
        rarity: {
            name: 'name',
            color: 'color'
        },
        images: 'images',
        added: 'added',
        id: 'id'
    }
}: {
    dataItem: TItemsShop;
}) => {
    return (
        <div className="flex flex-col rounded-md overflow-hidden p-1  shadow-lg bg-gray-200 relative">
            <div className="p-1 rounded-full absolute top-3 right-3" style={{ background: dataItem.rarity.color }} />
            <div className="bg-gray-300 rounded-md min-h-[150px]">
                <img src={dataItem.images} className="w-full object-cover" alt="" />
            </div>
            <div className="flex flex-col items-start gap-1 text-sm font-medium p-1">
                <span className="font-semibold"> {dataItem.name}</span>
                <span
                    className="px-2 py-1 text-white rounded-md  text-xs"
                    style={{ background: dataItem.rarity.color }}
                >
                    {' '}
                    {dataItem.type}
                </span>
            </div>
        </div>
    );
};

export default CartItemShopFort;
