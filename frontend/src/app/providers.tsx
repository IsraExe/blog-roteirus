'use client';
import AuthNavigation from '@/providers/AuthNavigation';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <AuthNavigation>
      {children}
    </AuthNavigation>
  )

};