import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoIosMore } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { fetchClient } from '@/utils/fetchClient';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/utils/cn';
import Modal from '@/components/Modal';

type CardPostProps = {
  id?: number;
  title: string;
  content: string;
  coverImage: string | undefined;
  date: string;
  hasConfig?: boolean;
  slug?: string;
};

const ModalDelete = ({ open, setOpen, handleExcludePost }: { open: boolean, setOpen: (open: boolean) => void, handleExcludePost: (e: MouseEvent) => void }) => {
  return (
    <Modal.Root open={open}>
      <Modal.Info icon={() => <IoIosMore />} title='Deseja mesmo excluir este artigo?' information='Essa operação não pode ser desfeita' />
      <div className='flex gap-4 mt-4'>
        <Modal.Button text='Cancelar' onClick={() => setOpen(false)} />
        <Modal.Button text='Excluir' onClick={handleExcludePost} />
      </div>
    </Modal.Root>
  );
};

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

const CardPost = ({ id, title, content, coverImage, date, hasConfig, slug }: CardPostProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const formattedDate = formatDate(date);

  const handleExcludePost = async (e: MouseEvent) => {
    e.preventDefault();

    const { response } = await fetchClient({ pathname: `/post/exclude/${id}`, method: 'DELETE' });

    if (response.ok) setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <article className='mb-2 grid grid-cols-[1fr_auto]'>
      <ModalDelete open={open} setOpen={setOpen} handleExcludePost={handleExcludePost} />
      <Link href={slug ? `/post/${slug}` : '#'} className='text-blue-600 group flex-grow'>
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

            <div className={cn('flex flex-col flex-grow min-w-0 relative', hasConfig && 'sm:pr-10')}>

              <h2 className='text-xl font-bold mb-2 group-hover:underline'>{title}</h2>
              <p className='text-gray-700 overflow-hidden'>
                {truncateText({ text: content, length: 100 })}
              </p>

              <time dateTime={date} className='text-gray-400 self-end sm:absolute bottom-0 hidden sm:block'>{formattedDate}</time>

              <div
                className={cn('w-full sm:w-8 sm:h-full bg-white rounded-md shadow-lg ml-1 py-1 sm:absolute top-0 right-0 px-2 sm:px-0 flex sm:justify-center justify-between', !hasConfig && 'sm:hidden')}
              >
                <div className={cn(!hasConfig ? 'hidden' : 'sm:flex sm:flex-col items-center gap-3')}>
                  <button className='cursor-pointer bg-gray-200 shadow-lg p-1 rounded-full sm:mr-0 mr-2'>
                    <MdEdit
                      className='cursor-pointer text-blue-600 hover:text-blue-800'
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/editar-artigo/${id}`);
                      }}
                    />
                  </button>

                  <button className='cursor-pointer bg-gray-200 shadow-lg p-1 rounded-full'>
                    <FaTrash
                      className='cursor-pointer text-red-600 hover:text-red-800'
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                    />
                  </button>
                </div>

                <time dateTime={date} className={cn('text-gray-400 self-end sm:hidden bottom-0 ')}>{formattedDate}</time> 
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CardPost;