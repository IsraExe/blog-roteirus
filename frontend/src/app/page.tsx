'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import fetchData from '@/utils/fetchData';

type TBlog = {
  id_post: number;
  nm_title: string;
  de_content: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<TBlog[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { response } = await fetchData({ method: 'GET', pathname: '/post/showAll' });
      const { message } = await response.json();
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mt-16'>
      <div className='w-full max-w-3xl space-y-4'>
        {blogs?.map((blog) => (
          <div
            className='bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300'
            key={blog.id_post}
          >
            <Link href={`/post/${blog.id_post}`} className='text-blue-600 hover:underline'>
              <h2 className='text-2xl font-bold mb-2'>{blog.nm_title}</h2>
              <p className='text-gray-700'>{truncateText({ text: blog.de_content, length: 100 })}</p>

            </Link>
          </div>
        ))}
      </div>
    </div>
  )
};
