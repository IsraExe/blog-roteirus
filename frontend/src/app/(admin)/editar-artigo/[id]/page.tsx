'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiEditAlt } from 'react-icons/bi';
import useFetch from '@/hooks/useFetch';
import { fetchClient } from '@/utils/fetchClient';
import Loading from '@/app/loading';
import Modal from '@/components/Modal';
import DragImage from '@/components/DragImage';
import CardPost from '@/components/CardPost';
import Label from '@/components/Label';
import FieldError from '@/components/FieldError';
import { TPost } from '@/types';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

const postSchema = z.object({
  title: z.string().min(1, 'O campo título é obrigatório!').max(100, 'O campo título deve ter no maximo 100 caracteres.').trim(),
  content: z.string({ required_error: 'O campo conteúdo é obrigatório!' }).trim()
    .refine(data => {
      const div = document.createElement('div');
      div.innerHTML = data;

      const innerText = div.textContent || div.innerText || '';

      return innerText.length >= 1;
    }, 'O campo conteúdo é obrigatório!')
    .refine(data => {
      const div = document.createElement('div');
      div.innerHTML = data;

      const innerText = div.textContent || div.innerText || '';

      return innerText.length > 20;
    }, 'O campo conteúdo deve ter no mínimo 20 caracteres!'),
  coverImage: z.string({ required_error: 'O campo imagem de capa é obrigatório!' }).min(1, 'O campo imagem de capa é obrigatório!')
});

type TPost2 = z.infer<typeof postSchema>;

const EditArticle = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<TPost2>({
    resolver: zodResolver(postSchema),
  });

  const router = useRouter();

  const { responseData, isLoading } = useFetch<{data: TPost}>({ pathname: `/post/getOne/${id}`, method: 'GET' });

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

    const { response } = await fetchClient({ pathname: '/post/edit', method: 'POST', bodyContent: updatedData });

    if (!response.ok) console.log('Error on post creation');

    const { data: { id_post } } = await response.json();

    setOpen(false);
    router.push(`/post/${id_post}`);

  };

  if (isLoading) return <Loading />;

  const { data } = responseData;

  const openModalAndSubmit = handleSubmit(() => setOpen(true));

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg'>
        <form onSubmit={handleSubmit(handleEdit)} className='space-y-4'>
          <div className='flex flex-col'>
            <Label text='Título' htmlFor='title' />
            <input
              {...register('title')}
              id='title'
              type='text'
              placeholder='Enter blog title'
              className='mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
              defaultValue={data.nm_title}
            />
            {errors.title && <FieldError message={errors.title.message!} />}
          </div>
          <Controller
            name='coverImage'
            control={control}
            defaultValue={data.cover_image}
            render={({ field }) => (
              <DragImage onChange={field.onChange} defaultImage={data.cover_image} />
            )}
          />
          {errors.coverImage && <FieldError message={errors.coverImage.message!} />}
          <div className='flex flex-col'>
            <Label text='Conteúdo' htmlFor='content' />
            <div className='mt-1 border border-gray-300 rounded-md'>
            <Controller
                name='content'
                control={control}
                defaultValue={data.de_content}
                render={({ field }) => (
                  <Editor onChange={field.onChange} defaultValue={data.de_content} />
                )}
              />
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
              type='submit'
              onClick={openModalAndSubmit}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Atualizar Post
            </button>
          </div>
        </form>

        <CardPost title={title || data.nm_title} content={content || data.de_content} coverImage={coverImage || data.cover_image} date={data.dt_created} />

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