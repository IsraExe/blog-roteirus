import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import './global.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Roteirus',
  description: 'Reviews de filmes e séries! Escreva a sua!',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-br'>
      <body className='min-h-screen'>
        <Providers>
          <div className='flex flex-col min-h-screen bg-gray-100 pt-16'>
            <Navbar />
            <div className='flex-grow'>
              {children}
            </div>
            <Footer />
            {/* <main className="flex-grow">{children}</main> */}
          </div>

        </Providers>
      </body>
    </html>
  );
};