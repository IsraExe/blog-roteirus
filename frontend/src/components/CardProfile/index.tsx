import Image from 'next/image';

type CardProfileProps = {
  username: string;
  bio: string;
  configButton?: React.ReactNode;
};

const CardProfile = ({ username, bio, configButton }: CardProfileProps) => {

  return (
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
          <div className='flex items-center gap-2'>
            <a href='#' rel='author' className='text-xl font-bold text-gray-900 dark:text-white'>
              {username}
            </a>
            {configButton}
          </div>
          <p className='text-base text-gray-500 dark:text-gray-400'>
            {bio}
          </p>
          <p className='text-base text-gray-500 dark:text-gray-400'>
            <time title='February 8th, 2022'> set. 15, 2024 </time>
          </p>
        </div>
      </div>
    </address>
  );
};

export default CardProfile;