'use client';
import Link from 'next/link';
import { TodoApp } from './components';

export default function Home() {
    return (
        <div className=" flex flex-col items-center ">
            {/* <Link href="/itemsShop?sortOrder=All">item Shop</Link> */}
            <TodoApp />
        </div>
    );
}
