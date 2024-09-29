import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { PUBLIC_URLS } from '@/config';
import useFetch from '@/hooks/useFetch';

interface AuthNavigationProps {
  children: React.ReactNode;
};

export default function AuthNavigationProvider({ children }: AuthNavigationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicUrl = PUBLIC_URLS.static.includes(pathname as string) || PUBLIC_URLS.dynamic.some(url => pathname.startsWith(url as string));

  const { status } = useFetch({ pathname: '/auth', method: 'GET' });

  useEffect(() => {

      if (isPublicUrl) return;
      
      if (status !== 200) router.push('/login');
      if (status === 200) setIsLoading(false);

  }, [router, isPublicUrl, status]);

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
