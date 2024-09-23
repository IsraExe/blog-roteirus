'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import fetchData from '@/utils/fetchData';
import { PUBLIC_URLS } from '@/config';

interface AuthNavigationProps {
  children: React.ReactNode;
};

export default function AuthNavigation({ children }: AuthNavigationProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicUrl = PUBLIC_URLS.static.includes(pathname as string) || PUBLIC_URLS.dynamic.some(url => pathname.startsWith(url as string));

  useEffect(() => {
    if (isPublicUrl) return setLoading(true);

    const checkAuth = async () => {
      const { response } = await fetchData({ method: 'GET', pathname: '/auth' });
      if (response.status !== 200) router.push('/signIn');
      else setLoading(false);
    };

    checkAuth();
  }, [pathname, router, isPublicUrl]);

  if (isPublicUrl) return <>{children}</>;

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <CircularProgress className='w-24 h-24' />
      </div>
    );
  };

  return <>{children}</>;
};