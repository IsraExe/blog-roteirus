import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import './global.css';

export const metadata: Metadata = {
  title: 'Roteirus',
  description: 'Reviews de filmes e séries! Escreva a sua!',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-br'>
      <body>
        <Providers>
          <Navbar title='' />
          {children}
        </Providers>
      </body>
    </html>
  );
};