import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';

type CardPostProps = {
  id?: number;
  title: string;
  content: string;
  coverImage: string | undefined;
  date: string;
};

const CardPost = ({ id, title, content, coverImage, date }: CardPostProps) => {
  const stripHtmlTags = (html: string) => {
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    };
    return html.replace(/<[^>]*>/g, '');
  };

  const truncateText = ({ text, length }: { text: string; length: number }) => {
    const plainText = stripHtmlTags(text);
    if (plainText.length <= length) return plainText;
    return `${plainText.substring(0, length)}...`;
  };

  const formattedDate = formatDate(date);

  return (
    <article className='mb-2'>
      <Link href={id ? `/post/${id}` : '#'} className='text-blue-600 hover:underline'>
        <div className='bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-shadow duration-300'>
          <div className='flex flex-col sm:flex-row w-full'>
            <picture className='sm:mr-5 mb-2 sm:mb-0 flex-shrink-0'>
              <Image
                src={coverImage || '/placeholder-image.jpg'}
                alt={`Cover image for ${title}`}
                className='rounded-md object-cover w-full sm:w-[200px] h-[120px]'
                width={200}
                height={120}
              />
            </picture>
            <div className='flex-grow min-w-0 relative'>
              <h2 className='text-2xl font-bold mb-2'>{title}</h2>
              <p className='text-gray-700 overflow-hidden'>
                {truncateText({ text: content, length: 100 })}
              </p>
              <time dateTime={date}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CardPost;