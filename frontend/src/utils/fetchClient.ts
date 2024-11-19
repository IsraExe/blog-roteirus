import { QueryClient } from '@tanstack/react-query';
import { FetchOptions } from '@/types';
import { SERVER_URL } from '@/config';

const queryClient = new QueryClient();

type FetchDataProps<T> = {
  pathname: string,
  method: string,
  data?: T,
};

interface FetchProps<T> {
  pathname: string;
  bodyContent?: T;
  method: string;
};

const fetchData = async <T>({ pathname, method, data }: FetchDataProps<T>) => {

  const options: FetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include'
  };

  const response = await fetch(`${SERVER_URL}${pathname}`, options);

  return { response };

};

const fetchClient = async <T>({ pathname, method, bodyContent }: FetchProps<T>) => {
  const queryKey = [pathname, { pathname, method, bodyContent }];

  const data = await queryClient.fetchQuery({
    queryKey,
    queryFn: () => fetchData<T>({ pathname, method, data: bodyContent }),
  });

  return data;
};

export { fetchClient };