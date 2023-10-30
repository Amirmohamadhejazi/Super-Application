'use client';
import Link from 'next/link';
// import { TodoApp } from './components';

export default function Home() {
    return (
        <div className="w-full min-h-screen flex justify-center gap-x-2 items-center">
            <Link href="/itemsShop?sortOrder=All" className="hover:text-lg  transition-all duration-700">
                itemShop
            </Link>
            <Link href="/weather" className="hover:text-lg  transition-all duration-700">
                Weather
            </Link>
            {/* <TodoApp /> */}
        </div>
    );
}
