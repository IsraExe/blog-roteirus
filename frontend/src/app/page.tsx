'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import Head from 'next/head';
import CardPost from '@/components/CardPost';

type TBlog = {
  id_post: number;
  nm_title: string;
  de_content: string;
  cover_image: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<TBlog[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { response } = await fetchData({ method: 'GET', pathname: '/post/showAll' });
      const { message } = await response.json();

      console.log(message);

      setBlogs(message);
    })();
  }, [router]);

  return (
    <>
      <Head>
        <title>Roteirus</title>
        <meta name="Roteirus" content="The blog to post your view point." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            'name': 'Roteirus',
            'url': 'https://roteirus.com.br/',
            'blogPost': blogs.map(blog => ({
              '@type': 'BlogPosting',
              'headline': blog.nm_title,
              'image': blog.cover_image,
              'articleBody': blog.de_content,
              'url': `https://roteirus.com.br/${blog.id_post}`,
            }))
          })}
        </script>
      </Head>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16'>
        <div className='w-full max-w-3xl space-y-4'>
          {blogs?.map((blog) => (
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
