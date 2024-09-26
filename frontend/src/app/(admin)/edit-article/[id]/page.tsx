'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Modal from '@/components/Modal';
import useFetch from '@/hooks/useFetch';
import Loading from '@/app/loading';
import fetchData from '@/utils/fetchData';
import { BiEditAlt } from 'react-icons/bi';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DragImage from '@/components/DragImage';
import CardPost from '@/components/CardPost';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

type TPost = {
  data: {
    de_content: string;
    nm_title: string;
    id_post: number;
    cover_image: string;
  };
};

const postSchema = z.object({
  title: z.string().min(1, 'O campo título é obrigatório!').max(50, 'O campo título deve ter no maximo 50 caracteres.'),
  content: z.string().min(1, 'O campo conteúdo é obrigatório!'),
  coverImage: z.string().optional()
});

type TPost2 = z.infer<typeof postSchema>;

const EditArticle = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<TPost2>({
    resolver: zodResolver(postSchema),
  });

  const getContent = useCallback((data: string) => setValue('content', data), [setValue]);
  const getCoverImage = (data: string) => setValue('coverImage', data);

  const { responseData, isLoading } = useFetch<TPost>({ pathname: `/post/getOne/${id}`, method: 'GET' });

  const { data } = responseData;

  const coverImage = watch('coverImage'); 
  const title = watch('title');
  const content = watch('content');

  const handlePreview = () => {
    sessionStorage.setItem('content', content);
    window.open('/preview', '_blank');
  };

  const handleEdit = async (data: TPost2) => {

    const updatedData = {
      ...data,
      id: Number(id),
    };

    const { response } = await fetchData({ pathname: '/post/edit', method: 'POST', data: updatedData});

    if (!response.ok) console.log('Error on post creation');

    console.log('Blog updatedsuccessfully');
  };

  if (isLoading) return <Loading />;

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-4 h-screen'>
      <div className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-16'>
        <form onSubmit={handleSubmit(handleEdit)} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='title' className='text-lg font-medium text-gray-700'>Título</label>
            <input
              {...register('title')}
              id='title'
              type='text'
              placeholder='Enter blog title'
              className='mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
              defaultValue={data.nm_title}
            />
          </div>
          <DragImage getCoverImage={getCoverImage} defaultImage={data.cover_image} />
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
              type='submit'
              onClick={() => setOpen(true)}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Atualizar Post
            </button>
          </div>
        </form>

        <CardPost title={title} content={content} coverImage={coverImage} />

      </div>

      <Modal.Root open={open}>
        <Modal.Info icon={() => <BiEditAlt />} title='Atualizar o post' information='Deseja mesmo atualizar?' />
        <div className='flex gap-4 mt-4'>
          <Modal.Button text='Cancelar' onClick={() => setOpen(false)} />
          <Modal.Button text='Postar' onClick={handleSubmit(handleEdit)} />
        </div>
      </Modal.Root>
    </div>
  );
};

export default EditArticle;