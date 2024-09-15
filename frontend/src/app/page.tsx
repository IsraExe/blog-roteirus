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

      setBlogs(message)

    })();
  }, [router]);

  const truncateText = ({ text, length }: any) => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  };

  return (

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="blog-list">
        {/* <h2>{title}</h2> */}
        {blogs?.map((blog) => (
          <div className="blog-preview" key={blog.id_post}>
            <Link href={`/post/${blog.id_post}`}>
              <h2>{blog.nm_title}</h2>
              <p>Written by {truncateText({text: blog.de_content, length: 100})}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>

  )

};