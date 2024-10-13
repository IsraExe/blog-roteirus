import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const useSetSearchParams = () => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearchParams = useCallback((name: string, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, String(value));

    router.push('/?' + params.toString());
  },
    [searchParams, router]
  );

  return { setSearchParams };

};

export { useSetSearchParams };