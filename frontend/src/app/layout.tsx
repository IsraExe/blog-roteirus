import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import './global.css';

export const metadata: Metadata = {
  title: 'Roteirus',
  description: 'Your info guider',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-br'>
      <body>
        <Providers>
          <Navbar title='' />
          <div className='min-h-[calc(100vh-40px)] bg-gray-900'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}