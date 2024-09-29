import { useQuery } from '@tanstack/react-query';
import { FetchOptions } from '@/types';
import { SERVER_URL } from '@/config';

type UseFetchProps = {
  pathname: string;
  data?: { [key: string]: unknown };
  method: string;
};

type FetchResponse<T> = {
  responseData: T | null;
  isLoading: boolean;
  status: number | null;
  error: Error | null;
};

type FetchResult<T> = {
  data: T;
  status: number;
};

async function fetchData<T>({ pathname, data, method }: UseFetchProps): Promise<FetchResult<T>> {
  const options: FetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    },
    credentials: 'include',
  };

  if (method !== 'GET' && data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${SERVER_URL}${pathname}`, options);
  const responseData: T = await response.json();

  return { data: responseData, status: response.status };
}

export default function useFetch<T>({ pathname, data, method }: UseFetchProps): FetchResponse<T> {
  const queryKey = [pathname, data, method];

  const { data: result, isLoading, error } = useQuery<FetchResult<T>, Error>({
    queryKey,
    queryFn: async () => await fetchData<T>({ pathname, data, method }),
    retry: false,
  });

  return { 
    responseData: result ? result.data : null, 
    status: result ? result.status : null, 
    isLoading,
    error
  };
}