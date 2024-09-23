import Image from 'next/image';
import Link from 'next/link';

type CardPostProps = {
  id?: number;
  title: string;
  content: string;
  coverImage: string | undefined;
};

const CardPost = ({id, title, content, coverImage }: CardPostProps) => {

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
    <article>
      <Link href={id ? `/post/${id}` : '#'} className='text-blue-600 hover:underline p-4'>
        <div className='bg-white shadow-lg rounded-lg p-2 hover:shadow-xl transition-shadow duration-300'>
          <div className='flex'>
            <picture className='mr-5'>
              <Image src={coverImage || ''} alt={`Cover image for ${title}`} className='rounded-md' width={200} height={200} />
            </picture>
            <div>
              <h2 className='text-2xl font-bold mb-2'>{title}</h2>
              <p className='text-gray-700'>{truncateText({ text: content, length: 100 })}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CardPost;