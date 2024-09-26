'use client';
import Head from 'next/head';
import CardPost from '@/components/CardPost';
import useFetch from '@/hooks/useFetch';
import Loading from './loading';

type TBlog = {
  data: {
    id_post: number;
    nm_title: string;
    de_content: string;
    cover_image: string;
  }[];
};

export default function Home() {

  const { responseData: blogs, isLoading } = useFetch<TBlog>({ pathname: '/post/showAll', method: 'GET' });

  if (isLoading) return <Loading />;

  const allBlogs = blogs.data;
  
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

      <div className='flex flex-col items-center justify-center'>
        <div className='w-full max-w-4xl space-y-4'>
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
      </div>
    </>
  );
};
