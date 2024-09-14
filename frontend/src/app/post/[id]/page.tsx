'use client'
import Loading from '@/app/loading';
import useFetch from '@/hooks/useFetch';
import { useEffect, useRef } from 'react';

type TPost = {
  data: {
    de_content: string;
    nm_title: string;
    id_post: number;
  }
};

const Post = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const refDiv = useRef<HTMLDivElement | null>(null);

  const { responseData, isLoading } = useFetch<TPost>({ pathname: `/post/getOne/${id}`, method: 'GET' });
  
  const { data } = responseData;
  
  useEffect(() => {

    if (refDiv.current && data) refDiv.current.innerHTML = data.de_content;
  
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1>Post inteiro</h1>
      <div>
        <h2>Post details:</h2>
        <p>ID: {id}</p>
        <div ref={refDiv} />
      </div>
    </div>
  );
};

export default Post;
