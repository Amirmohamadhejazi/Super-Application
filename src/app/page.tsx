'use client';
import Link from 'next/link';
import { StrongPasswordChecker } from './components';

export default function Home() {
    const data = ['Banana', 'Orange', 'Apple', 'Mango'];
    data.copyWithin(2, 1);
    console.log(data);
    return (
        <div className=" flex flex-col">
            <Link href="/itemsShop?sortOrder=All">item Shop</Link>
            <StrongPasswordChecker />
        </div>
    );
}
