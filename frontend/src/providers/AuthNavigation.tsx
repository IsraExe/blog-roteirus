'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import fetchData from '@/utils/fetchData';
import { PUBLIC_URLS } from '@/config';

export default function AuthNavigation({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (PUBLIC_URLS.static.includes(pathname as string) || PUBLIC_URLS.dynamic.some(url => pathname.startsWith(url as string))) return setLoading(false);

    (async () => {
      const { response } = await fetchData({ method: 'GET', pathname: '/auth' });

      if (response.status !== 200) return router.push('/signIn');

      setLoading(false);
    })();
    
  }, [pathname, router]);

  return (
    <>
    {children}
      {/* {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <CircularProgress size={100} />
        </div>
      )}
      {(!loading) && children} */}
    </>
  )
}