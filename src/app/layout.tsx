import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className}  select-none bg-black text-white`}>
                <div className=" container mx-auto">{children}</div>
            </body>
        </html>
    );
}

