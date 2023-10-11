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
    data: IItemShop[];
}
const ItemsComponent = ({ sortOrder, data }: Props) => {
    const dataItems = data;

    console.log(dataItems);

    const SortedItems = sort(dataItems).asc(
        sortOrder === 'name'
            ? (item) => item.name
            : sortOrder === 'numbers'
            ? (item) => item.numbers
            : (item) => item.brand
    );
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
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
