import { ReactNode } from 'react';
import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Layout/Navbar';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moja Strona - Profesjonalne Usługi',
  description: 'Oferujemy profesjonalne usługi web developmentu',
};


export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: ReactNode;
  params: {locale: string};
}) {


  return (
    <html lang={locale}>
      <body className={inter.className}>
       <NextIntlClientProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
