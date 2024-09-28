'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import fetchData from '@/utils/fetchData';
import Modal from '@/components/Modal';
import DragImage from '@/components/DragImage';
import CardPost from '@/components/CardPost';
import Label from '@/components/Label';
import FieldError from '@/components/FieldError';

const ReactQuillEditor = dynamic(() => import('@/components/Editor'), { ssr: false });

const postSchema = z.object({
  title: z.string().min(1, 'O campo título é obrigatório!').max(100, 'O campo título deve ter no maximo 100 caracteres.'),
  content: z.string().min(1, 'O campo conteúdo é obrigatório!'),
  coverImage: z.string().optional()
});

type TPost = z.infer<typeof postSchema>;

const CreateArticle = () => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TPost>({
    resolver: zodResolver(postSchema),
  });

  const getContent = useCallback((data: string) => setValue('content', data), [setValue]);

  const getCoverImage = (data: string) => setValue('coverImage', data);

  const coverImage = watch('coverImage'); 
  const title = watch('title');
  const content = watch('content');

  const handlePreview = () => {
    sessionStorage.setItem('content', content);
    window.open('/preview', '_blank');
  };

  const handlePost = async (data: TPost) => {
    const { response } = await fetchData({ pathname: '/post/create', method: 'POST', data });
    if (!response.ok) console.log('Error on post creation');
    console.log('New blog added successfully');
  };

  const openModalAndSubmit = handleSubmit(() => setOpen(true));

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg'>
        <form onSubmit={handleSubmit(handlePost)} className='space-y-4'>
          <div className='flex flex-col'>
            <Label text='Título' htmlFor='title' />
            <input
              id='title'
              {...register('title')}
              type='text'
              placeholder='Enter blog title'
              className='mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            />
            {errors.title && <FieldError message={errors.title.message!} />}
          </div>
          <DragImage getCoverImage={getCoverImage} />
          {errors.content && <FieldError message={errors.content.message!} />}
          <div className='flex flex-col'>
            <Label text='Conteúdo' htmlFor='content' />
            <div className='mt-1 border border-gray-300 rounded-md'>
              <ReactQuillEditor getContent={getContent} />
            </div>
            {errors.content && <FieldError message={errors.content.message!} />}
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
              onClick={openModalAndSubmit}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Criar Post
            </button>
          </div>
        </form>

        <CardPost title={title} content={content} coverImage={coverImage} />

      </div>

      <Modal.Root open={open}>
        <Modal.Info icon={() => <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l2 2M12 4v.01M19.07 6.93a10.012 10.012 0 00-1.35-1.35M16 10h.01M7 10H6.99M4.93 6.93A10.012 10.012 0 002.68 8.28M10 16h.01M14 16h.01M16 18h.01M19.07 17.07a10.012 10.012 0 00-1.35 1.35M19 12h.01M3 12h.01M6 16h.01M7 8V8M16 4v.01M4.93 17.07A10.012 10.012 0 002.68 15.72M20 12h.01M8 12h.01M12 16h.01M4 4v.01M19 4v.01M12 20v.01M16 20v.01'></path></svg>} title='This is a preview' information='Preview' />
        <div className='flex gap-4 mt-4'>
          <Modal.Button text='Cancelar' onClick={() => setOpen(false)} />
          <Modal.Button text='Postar' onClick={handleSubmit(handlePost)} />
        </div>
      </Modal.Root>

    </div>
  );
};

export default CreateArticle;