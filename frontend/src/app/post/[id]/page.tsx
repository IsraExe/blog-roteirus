'use client';
import { useEffect, useRef } from 'react';
import Loading from '@/app/loading';
import useFetch from '@/hooks/useFetch';
import Image from 'next/image';

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

              <address className='flex items-center mb-6 not-italic'>
                <div className='flex items-center mr-3 text-sm text-gray-900 dark:text-white' style={{ width: '100%' }}>
                  <picture className='mr-4'>
                    <Image
                      className='rounded-full w-20 h-20 object-cover'
                      src='/autor5.jpg'
                      width={200}
                      height={200}
                      alt='autor'
                    />
                  </picture>
                  <div className='flex-1'>
                    <a href='#' rel='author' className='text-xl font-bold text-gray-900 dark:text-white'>
                      {data.user.nm_user}
                    </a>
                    <p className='text-base text-gray-500 dark:text-gray-400'>
                      {data.user.de_bio || 'Bio not available.'}
                    </p>
                    <p className='text-base text-gray-500 dark:text-gray-400'>
                      <time title='February 8th, 2022'> set. 15, 2024 </time>
                    </p>
                  </div>
                </div>
              </address>

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
