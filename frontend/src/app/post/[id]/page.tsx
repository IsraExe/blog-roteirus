'use client'
import { useEffect, useRef } from 'react';
import Loading from '@/app/loading';
import useFetch from '@/hooks/useFetch';

type TPost = {
  data: {
    de_content: string;
    nm_title: string;
    id_post: number;
  };
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
        <main className='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased bg-gray-200'>
          <div className='flex justify-between px-4 mx-auto max-w-screen-xl '>
            <article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
              <header className='mb-4 lg:mb-6 not-format'>
                <address className='flex items-center mb-6 not-italic'>
                  <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white' >
                    {/* <img className='mr-4 w-16 h-16 rounded-full' src='' alt='autor' /> */}
                    <div>
                      <a href='#' rel='author' className='text-xl font-bold text-gray-900 dark:text-white'>Autor</a>
                      <p className='text-base text-gray-500 dark:text-gray-400'>Full Stack Developer, internacionalist</p>
                      <p className='text-base text-gray-500 dark:text-gray-400'><time title='February 8th, 2022'>sep. 15, 2024</time></p>
                      
                    </div>
                  </div>
                </address>
                <h1 className='mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white'>{data.nm_title}</h1>
              </header>

              <div>
                <div ref={refDiv} />
              </div>

              <a href={`/editArticle/${id}`}>Editar </a>
            </article>
          </div>
        </main>
    </div>
  );
};

export default Post;
