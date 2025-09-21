'use client';
import { useEffect, useRef } from 'react';
import Loading from '@/app/loading';
import useFetch from '@/hooks/useFetch';
import CardProfile from '@/components/CardProfile';
import { TPost } from '@/types';

type TGetPostResponse = {
  data: TPost;
};

const Post = ({ params }: { params: { slug: string } }) => {

  const { slug } = params;
  const refDiv = useRef<HTMLDivElement | null>(null);
  const { responseData, isLoading } = useFetch<TGetPostResponse>({ pathname: `/post/getOne/${slug}`, method: 'GET' });

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

          </article>
        </div>
      </main>
    </>
  );
};

export default Post;
