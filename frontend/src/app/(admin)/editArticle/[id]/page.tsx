'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Modal from '@/components/Modal';
import useFetch from '@/hooks/useFetch';
import Loading from '@/app/loading';
import fetchData from '@/utils/fetchData';
import { BiEditAlt } from "react-icons/bi";

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
              Atualizar Post
            </button>
          </div>
        </form>
      </div>

      <Modal.Root open={open}>
        <Modal.Info icon={() => <BiEditAlt />} title='Atualizar o post' information='Deseja mesmo atualizar?' />
        <div className='flex gap-4 mt-4'>
          <Modal.Button text='Cancelar' onClick={() => setOpen(false)} />
          <Modal.Button text='Postar' onClick={handleSubmit} />
        </div>
      </Modal.Root>
    </div>
  );
};

export default Create;
