import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FetchOptions } from '@/types';
import { SERVER_URL } from '@/config';

type UseFetchProps = {
  pathname: string,
  data?: { [key: string]: unknown };
  method: string,
};

interface FetchResponse<T> {
  pulledData: T;
  loading: boolean;
}

export default function useFetch<T>({ pathname, data, method }: UseFetchProps): FetchResponse<T> {
  const [pulledData, setPulledData] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    (async () => {
      try {
        const options: FetchOptions = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
          body: JSON.stringify(data),
          credentials: 'include',
          signal
        };

        const response = await fetch(`${SERVER_URL}${pathname}`, options);
        const dataFetched = await response.json();

        if ((response.status === 401 || response.status === 400)) return router.push('/signIn');

        if (!response.ok) {
          setError(`HTTP error! status: ${response.status}`);
          setLoading(false);
          return;
        }

        setPulledData(dataFetched);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') return;
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [pathname, data, method, router]);

  if (error) throw new Error(error);

  return { pulledData, loading };
};
