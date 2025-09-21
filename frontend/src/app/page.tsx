'use client';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import CardPost from '@/components/CardPost';
import Pagination from '@/components/Pagination';
import useFetch from '@/hooks/useFetch';
import Loading from './loading';
import { TPost } from '@/types';

type TBlog = {
  data: {
    allPosts: TPost[];
    countAllPosts: number;
  };
};

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;

  const { responseData, isLoading } = useFetch<TBlog>({ pathname: `/post/showAll?page=${page}`, method: 'GET' });

  if (isLoading) return <Loading />;

  const allBlogs = responseData.data.allPosts;
  const totalPosts = responseData.data.countAllPosts;

  return (
    <>
      <Head>
        <title>Roteirus</title>
        <meta name='Roteirus' content='Escreva. Compartilhe. Descubra.' />
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            'name': 'Roteirus',
            'description': 'Escreva. Compartilhe. Descubra.',
            'url': 'https://roteirus.com.br/',
            'blogPost': allBlogs.map((blog: TPost) => ({
              '@type': 'BlogPosting',
              'headline': blog.nm_title,
              'image': blog.cover_image,
              'articleBody': blog.de_content,
              'url': `https://roteirus.com.br/${blog.slug}`,
            }))
          })}
        </script>
      </Head>

      <div className='flex flex-col items-center justify-center mt-2'>
        
        <div className='w-full max-w-4xl'>
          {allBlogs.map((blog: TPost) => (
            <CardPost
              key={blog.id_post}
              id={Number(blog.id_post)}
              title={blog.nm_title}
              content={blog.de_content}
              coverImage={blog.cover_image}
              date={blog.dt_created}
              slug={blog.slug}
              hasConfig={false}
            />
          ))}
        </div>

        <Pagination totalPosts={totalPosts} />

      </div>

    </>
  );

};