'use client';

import useFetch from '@/hooks/useFetch';
import Image from 'next/image';
import Loading from '@/app/loading';

const MyProfile = () => {

  const { responseData, isLoading } = useFetch<any>({ pathname: '/user/getUser', method: 'GET' });

  console.log(responseData);

  if (isLoading) return <Loading />;

  return (

    <div>
      <header className='mb-4 lg:mb-6 not-format'>

        <address className='flex items-center mb-6 not-italic'>
          <div className='flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
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
                {/* {data.user.nm_user} */}
              </a>
              <p className='text-base text-gray-500 dark:text-gray-400'>
                {/* {data.user.de_bio || 'Bio not available.'} */}
              </p>
              <p className='text-base text-gray-500 dark:text-gray-400'>
                <time title='February 8th, 2022'> set. 15, 2024 </time>
              </p>
            </div>
          </div>
        </address>
      </header>
    </div>
  );
};

export default MyProfile;