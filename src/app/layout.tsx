'use client';

import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import './globals.css';
import { Inter } from 'next/font/google';

import Providers from './components/Providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className}  select-none  `}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
