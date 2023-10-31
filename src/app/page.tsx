'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="w-full min-h-screen flex justify-center gap-x-2 items-center">
            <Link href="/todoApp" className="hover:text-lg  transition-all duration-700">
                TodoApp
            </Link>
            <Link href="/weather" className="hover:text-lg  transition-all duration-700">
                Weather
            </Link>
            <Link href="/itemsShop?sortOrder=name" className="hover:text-lg   rounded-md transition-all duration-700">
                ShopItems <span>(Maybe have a problem)</span>
            </Link>
        </div>
    );
}
