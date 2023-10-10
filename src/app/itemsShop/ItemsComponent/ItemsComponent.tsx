'use client';
import React from 'react';
import { iphone15 } from '../../../../public/picture';
import { sort } from 'fast-sort';

interface IItemShop {
    name: string;
    numbers: number;
    brand: string;
    id: number;
}

interface Props {
    sortOrder: string;
}
const ItemsComponent = ({ sortOrder }: Props) => {
    const dataItems: IItemShop[] = [
        {
            name: 'iphone 15',
            numbers: 5,
            brand: 'Apple',
            id: 0
        },
        {
            name: 'note 10',
            numbers: 10,
            brand: 'Samsung',
            id: 1
        },
        {
            name: 'pixel 5',
            numbers: 2,
            brand: 'Google',
            id: 2
        },
        {
            name: 'S10',
            numbers: 1,
            brand: 'Samsung',
            id: 3
        },
        {
            name: 'P50',
            numbers: 0,
            brand: 'Huawei',
            id: 4
        },
        {
            name: 'G7+',
            numbers: 1,
            brand: 'lg',
            id: 5
        }
    ];

    const SortedItems = sort(dataItems).asc(
        sortOrder === 'name'
            ? (item) => item.name
            : sortOrder === 'numbers'
            ? (item) => item.numbers
            : (item) => item.brand
    );
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 ">
                {SortedItems.map((items) => (
                    <div key={items.id} className="bg-slate-200 p-1 flex flex-col gap-y-2 rounded-md">
                        <div className="w-full flex items-center justify-center   rounded-md overflow-hidden">
                            <img src={iphone15.src} className="w-full h-full object-cover " alt="iphone img" />
                        </div>
                        <div className="w-full bg-gray-100 rounded-md  flex items-center justify-between p-2">
                            <span className="text-lg font-bold"> {items.name}</span>
                            <div className="flex flex-col">
                                <span> {items.brand}</span>
                                <span>number: {items.numbers}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsComponent;
