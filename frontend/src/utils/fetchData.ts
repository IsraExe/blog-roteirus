import { FetchOptions } from '@/types';
import { SERVER_URL } from '@/config';

type FetchDataProps = {
  pathname: string,
  method: string,
  data?: {
    [key: string]: unknown
  },
};

const fetchData = async ({ pathname, method, data }: FetchDataProps) => {

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

export default fetchData;