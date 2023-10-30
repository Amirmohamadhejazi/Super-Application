'use client'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import './globals.css';
import { Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className}  select-none  `}>
                <QueryClientProvider client={queryClient}>
                    <MantineProvider>
                        <div className=" mx-auto">{children}</div>
                        <ToastContainer />
                    </MantineProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
