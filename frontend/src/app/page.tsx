'use client';
import Head from 'next/head';
import CardPost from '@/components/CardPost';
import Pagination from '@/components/Pagination';
import useFetch from '@/hooks/useFetch';
import Loading from './loading';
import { useSearchParams } from 'next/navigation';

type TBlog = {
  data: {
    allPosts: {
      id_post: string;
      nm_title: string;
      de_content: string;
      cover_image: string;
    }[];
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
        <meta name='Roteirus' content='The blog to post your view point.' />
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            'name': 'Roteirus',
            'url': 'https://roteirus.com.br/',
            'blogPost': allBlogs.map((blog: any) => ({
              '@type': 'BlogPosting',
              'headline': blog.nm_title,
              'image': blog.cover_image,
              'articleBody': blog.de_content,
              'url': `https://roteirus.com.br/${blog.id_post}`,
            }))
          })}
        </script>
      </Head>

      <div className='flex flex-col items-center justify-center mt-2'>
        
        <div className='w-full max-w-4xl'>
          {allBlogs.map((blog: any) => (
            <CardPost
              key={blog.id_post}
              id={blog.id_post}
              title={blog.nm_title}
              content={blog.de_content}
              coverImage={blog.cover_image}
            />
          ))}
        </div>

        <Pagination totalPosts={totalPosts} />

      </div>

    </>
  );

};