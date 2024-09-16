'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Modal from '@/components/Modal';
import useFetch from '@/hooks/useFetch';
import Loading from '@/app/loading';
import fetchData from '@/utils/fetchData';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

type TPost = {
  data: {
    de_content: string;
    nm_title: string;
    id_post: number;
  }
};

const Create = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const getContent = (data: any) => setContent(data);

  const { responseData, isLoading } = useFetch<TPost>({ pathname: `/post/getOne/${id}`, method: 'GET' });

  const { data } = responseData;

  const handlePreview = () => {
    sessionStorage.setItem('content', content);
    window.open('/preview', '_blank');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const blog = { title: title || data.nm_title, content: content || data.de_content, id };

    const { response } = await fetchData({ pathname: '/post/edit', method: 'POST', data: blog })

    //TODO: If ok, returns home and shows a toast
    // else shows a toast error

    console.log('New blog added successfully');
  };

  if (isLoading) return <Loading />

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-4 h-screen'>
      <div className='w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mt-16'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='title' className='text-lg font-medium text-gray-700'>Título</label>
            <input
              id='title'
              type='text'
              placeholder='Enter blog title'
              className='mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
              defaultValue={data.nm_title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='content' className='text-lg font-medium text-gray-700'>Conteúdo</label>
            <div className='mt-1 border border-gray-300 rounded-md'>
              <Editor getContent={getContent} defaultValue={data.de_content} />
            </div>
          </div>
          <div className='flex gap-4 mt-4'>
            <button
              type='button'
              onClick={handlePreview}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Preview
            </button>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Criar Post
            </button>
          </div>
        </form>
      </div>

      <Modal.Root open={open}>
        <Modal.Info icon={() => <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l2 2M12 4v.01M19.07 6.93a10.012 10.012 0 00-1.35-1.35M16 10h.01M7 10H6.99M4.93 6.93A10.012 10.012 0 002.68 8.28M10 16h.01M14 16h.01M16 18h.01M19.07 17.07a10.012 10.012 0 00-1.35 1.35M19 12h.01M3 12h.01M6 16h.01M7 8V8M16 4v.01M4.93 17.07A10.012 10.012 0 002.68 15.72M20 12h.01M8 12h.01M12 16h.01M4 4v.01M19 4v.01M12 20v.01M16 20v.01'></path></svg>} title='This is a preview' information='Preview' />
        <div className='flex gap-4 mt-4'>
          <Modal.Button text='Cancelar' onClick={() => setOpen(false)} />
          <Modal.Button text='Postar' onClick={handleSubmit} />
        </div>
      </Modal.Root>
    </div>
  );
};

export default Create;
