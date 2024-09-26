import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './global.css';

export const metadata: Metadata = {
  title: 'Roteirus',
  description: 'Reviews de filmes e séries! Escreva a sua!',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-br'>
      <body className='overflow-y-hidden min-h-screen'>
        <Providers>
          <Navbar />
          <div className='flex flex-col h-screen'>
            <div className='overflow-y-auto bg-gray-100 pt-16 h-screen flex flex-col justify-between'>
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};
