'use client';

import { useSearchParams } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import Loading from '@/app/loading';
import CardProfile from '@/components/CardProfile';
import CardPost from '@/components/CardPost';
import Pagination from '@/components/Pagination';
import { TPost } from '@/types';
import { PiGearBold } from 'react-icons/pi';

type TUserResponse = {
  data: {
    de_bio: string;
    nm_user: string;
    posts: TPost[];
    totalPosts: number;
  };
};

const MyProfile = () => {

  const searchParams = useSearchParams();

  const page = searchParams.get('page') || 1;

  const { responseData, isLoading } = useFetch<TUserResponse>({ pathname: `/user/getUser?page=${page}`, method: 'GET' });

  if (isLoading) return <Loading />;

  const { data: { de_bio, nm_user, posts, totalPosts } } = responseData;

  return (

    <div className='flex flex-col items-center justify-center mt-2'>
      <div className='w-full max-w-4xl'>
        <header className='mb-4 lg:mb-6 not-format'>
          <CardProfile
            username={nm_user}
            bio={de_bio}
            configButton={
              <button className='bg-gray-200 rounded-md shadow-md py-0.5 px-1'>
                <PiGearBold size={20} className='text-gray-700 dark:text-gray-400 cursor-pointer hover:animate-spin-once' />
              </button>
            }
          />
        </header>

        <div>
          <h2 className='text-3xl font-extrabold leading-tight text-gray-700'>Meus Posts</h2>

          <div className='w-full max-w-4xl'>
            {posts.map((blog: TPost) => (
              <CardPost
                key={blog.id_post}
                id={Number(blog.id_post)}
                title={blog.nm_title}
                content={blog.de_content}
                coverImage={blog.cover_image}
                date={blog.dt_created}
                slug={blog.slug}
                hasConfig
              />
            ))}
          </div>
          <Pagination totalPosts={totalPosts} />
        </div>

      </div>
    </div>

  );

};

export default MyProfile;