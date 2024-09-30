'use client';

import useFetch from '@/hooks/useFetch';
import Loading from '@/app/loading';
import CardProfile from '@/components/CardProfile';

const MyProfile = () => {

  const { responseData, isLoading } = useFetch<any>({ pathname: '/user/getUser', method: 'GET' });

  if (isLoading) return <Loading />;

  const { data } = responseData;

  return (

    <div>
      <header className='mb-4 lg:mb-6 not-format'>
        <CardProfile username={data.nm_user} bio={data.de_bio} />
      </header>
    </div>
  );
};

export default MyProfile;