'use client';
import AuthNavigation from '@/providers/AuthNavigationProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ReactQueryProvider>
      <AuthNavigation>
        {children}
      </AuthNavigation>
    </ReactQueryProvider>
  );

};