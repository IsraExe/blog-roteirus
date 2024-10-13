import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import fetchData from '@/utils/fetchData';
import { PUBLIC_URLS } from '@/config';

interface AuthNavigationProps {
  children: React.ReactNode;
};

export default function AuthNavigation({ children }: AuthNavigationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicUrl = PUBLIC_URLS.static.includes(pathname as string) || PUBLIC_URLS.dynamic.some(url => pathname.startsWith(url as string));

  useEffect(() => {
    const checkAuth = async () => {
      if (isPublicUrl) return;

      const { response } = await fetchData({ method: 'GET', pathname: '/auth' });

      if (response.status !== 200) router.push('/login');
      if (response.status === 200) setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router, isPublicUrl]);

  return (
    <>
      {(isPublicUrl || !isLoading) && <>{children}</>}
      {isLoading && (
        <div className='flex items-center justify-center h-screen'>
          <CircularProgress className='w-24 h-24' />
        </div>
      )}
    </>
  );
};
