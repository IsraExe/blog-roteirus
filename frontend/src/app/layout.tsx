import type { Metadata } from 'next';
import { CssBaseline } from '@mui/material';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Roteirus',
  description: 'Your info guider',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-br'>
      <body style={{ backgroundColor: '#0f0f0f'}}>
        <Providers>
          <CssBaseline />
          {children}
        </Providers>
      </body>
    </html>
  );
}
