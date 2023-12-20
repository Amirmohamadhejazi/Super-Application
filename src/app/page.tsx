'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="w-full min-h-screen font-bold flex justify-center gap-x-2 items-center">
            <Link
                href="https://github-five-alpha.vercel.app"
                target="_blank"
                className="hover:text-lg  transition-all duration-400"
            >
                GithubStatus
            </Link>
            <Link
                href="https://fortnite-rust.vercel.app"
                target="_blank"
                className="hover:text-lg  transition-all duration-400"
            >
                Fortnite
            </Link>
            <Link href="/todoApp" target="_blank" className="hover:text-lg  transition-all duration-400">
                TodoApp
            </Link>
            <Link href="/weather" target="_blank" className="hover:text-lg  transition-all duration-400">
                Weather
            </Link>
            {/* <Link
                href="/itemsShop?sortOrder=name"
                target="_blank"
                className="hover:text-lg   rounded-md transition-all duration-700"
            >
                ShopItems
            </Link> */}
        </div>
    );
}
