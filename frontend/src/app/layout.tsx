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
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
};