'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import fetchData from '@/utils/fetchData';
import Image from 'next/image';
import Head from 'next/head';

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

      console.log(message)

      setBlogs(message);
    })();
  }, [router]);

  const stripHtmlTags = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const truncateText = ({ text, length }: { text: string; length: number }) => {
    const plainText = stripHtmlTags(text);
    if (plainText.length <= length) return plainText;
    return `${plainText.substring(0, length)}...`;
  };

  return (
    <>
      <Head>
        <title>Roteirus</title>
        <meta name="Roteirus" content="The blog to post your view point." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Roteirus",
            "url": "https://roteirus.com.br/",
            "blogPost": blogs.map(blog => ({
              "@type": "BlogPosting",
              "headline": blog.nm_title,
              "image": blog.cover_image,
              "articleBody": blog.de_content,
              "url": `https://roteirus.com.br/${blog.id_post}`,
            }))
          })}
        </script>
      </Head>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16'>
        <div className='w-full max-w-3xl space-y-4'>
          {blogs?.map((blog) => (
            <article key={blog.id_post}>
              <Link href={`/post/${blog.id_post}`} className='text-blue-600 hover:underline p-4'>
                <div className='bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-shadow duration-300'>
                  <div className='flex'>
                    <picture className='mr-5'>
                      <Image src={blog.cover_image} alt={`Cover image for ${blog.nm_title}`} className='rounded-md' width={200} height={200} />
                    </picture>
                    <div>
                      <h2 className='text-2xl font-bold mb-2'>{blog.nm_title}</h2>
                      <p className='text-gray-700'>{truncateText({ text: blog.de_content, length: 100 })}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  )
};
