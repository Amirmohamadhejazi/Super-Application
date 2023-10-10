'use client';
import React from 'react';
import ItemsComponent from './ItemsComponent/ItemsComponent';
import Link from 'next/link';

interface Props {
    searchParams: { sortOrder: string };
}
interface ISortData {
    name: string;
    id: number;
}

const itemsShop = ({ searchParams: { sortOrder } }: Props) => {
    const sortData: ISortData[] = [
        { name: 'All', id: 0 },
        { name: 'name', id: 1 },
        { name: 'numbers', id: 2 },
        { name: 'brand', id: 3 }
    ];
    return (
        <div className="p-5 flex flex-col gap-y-6">
            <div className="flex flex-col justify-end items-end">
                <div className="flex gap-x-5">
                    <p className='font-semibold'>Sort by:</p>
                    <div className="flex gap-x-2 text-lg font-bold">
                        {sortData.map((items) => (
                            <Link href={`itemsShop?sortOrder=${items.name}`} key={items.id}>
                                <span className={`${sortOrder === items.name && 'bg-orange-400 text-white'} p-1 rounded-md`}>{items.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <ItemsComponent sortOrder={sortOrder} />
        </div>
    );
};

export default itemsShop;
