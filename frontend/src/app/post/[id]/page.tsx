'use client';
import { useEffect, useRef } from 'react';
import Loading from '@/app/loading';
import useFetch from '@/hooks/useFetch';
import CardProfile from '@/components/CardProfile';

type TPost = {
  data: {
    de_content: string;
    nm_title: string;
    id_post: number;
    user: {
      nm_user: string;
      de_bio: string;
    }
  };
};

const Post = ({ params }: { params: { id: string } }) => {

  const { id } = params;
  const refDiv = useRef<HTMLDivElement | null>(null);
  const { responseData, isLoading } = useFetch<TPost>({ pathname: `/post/getOne/${id}`, method: 'GET' });

  useEffect(() => {

    if (!responseData) return;

    if (refDiv.current && responseData.data) refDiv.current.innerHTML = responseData.data.de_content;

  }, [responseData]);

  if (isLoading) return <Loading />;

  const { data } = responseData;

  return (
    <>
      <main className='lg:pb-24 antialiased'>
        <div className='flex justify-between mt-2'>
          <article className='mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
            <header className='mb-4 lg:mb-6 not-format'>

              <CardProfile username={data.user.nm_user} bio={data.user.de_bio} />

              <h1 className='mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white'>
                {data.nm_title}
              </h1>
            </header>

            <div ref={refDiv} />

            <a href={`/editar-artigo/${id}`}> Editar </a>
          </article>
        </div>
      </main>
    </>
  );
};

export default Post;
