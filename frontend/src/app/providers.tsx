'use client';
import ThemeMuiRegistry from '@/providers/ThemeMuiRegistry';
import AuthNavigation from '@/providers/AuthNavigation';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ThemeMuiRegistry options={{ key: 'mui' }}>
      <AuthNavigation>
        {children}
      </AuthNavigation>
    </ThemeMuiRegistry>
  )
}