import { useQuery } from '@tanstack/react-query';
import { FetchOptions } from '@/types';
import { SERVER_URL } from '@/config';

type UseFetchProps = {
  pathname: string;
  data?: { [key: string]: unknown };
  method: string;
};

type FetchResponse<T> = {
  responseData: T;
  isLoading: boolean;
  status: number | null;
};

async function fetchData<T>({ pathname, data, method }: UseFetchProps): Promise<T> {
  
  const options: FetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
  };

  const response = await fetch(`${SERVER_URL}${pathname}`, options);

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return await response.json();

};

export default function useFetch<T>({ pathname, data, method }: UseFetchProps): FetchResponse<T> {

  const queryKey = [pathname, data, method];

  const { data: pulledData, isLoading } = useQuery<T, Error>({
    queryKey,
    queryFn: async () => await fetchData<T>({ pathname, data, method }),
    retry: false,
  });

  return { responseData: pulledData as T, status: null, isLoading };

};