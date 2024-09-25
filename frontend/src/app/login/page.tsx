'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchData from '@/utils/fetchData';

import InputField from '@/components/InputField';
import FieldError from '@/components/FieldError';

const signInSchema = z.object({
  email: z.string().min(1, 'O campo email é obrigatório!').email('Email inválido!'),
  password: z.string().min(1, 'O campo senha é obrigatório!')
});

type TSignInSchema = z.infer<typeof signInSchema>;

export default function SignIn() {

  const [signInError, setSignInError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirectFromSignUp = searchParams?.get('showModal');

  const notify = () => toast('Usuário cadastrado com sucesso!');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (Boolean(redirectFromSignUp)) {
      notify();
      router.replace(pathname as string, undefined);
    }
  }, [router, pathname, redirectFromSignUp]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const { register, handleSubmit, formState: { errors } } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignIn = async (data: TSignInSchema) => {
    const { response } = await fetchData({ method: 'POST', pathname: '/user/login', data });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      return router.push('/');
    };

    if (response.status === 500) setSignInError('Ocorreu um erro no servidor, tente novamente mais tarde.');
    if (response.status === 401) setSignInError('Email e/ou senha incorreto(s)!');
  };

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 min-h-[calc(100vh-52px)]'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-900'>Roteirus - Login</h1>
        {signInError && <p className='text-red-600 mt-2'>{signInError}</p>}
      </div>
      <form onSubmit={handleSubmit(handleSignIn)} className='w-full max-w-sm bg-white p-8 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <InputField
            {...register('email')}
            label='Email'
            className='w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          />
          {errors.email && <FieldError message={errors.email.message!} />}
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 text-sm font-medium mb-1'>Senha</label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className='w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              autoComplete='off'
            />
            <button
              type='button'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              className='absolute inset-y-0 right-0 flex items-center pr-3'
            >
              {showPassword ? (
                <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l2 2M12 4v.01M19.07 6.93a10.012 10.012 0 00-1.35-1.35M16 10h.01M7 10H6.99M4.93 6.93A10.012 10.012 0 002.68 8.28M10 16h.01M14 16h.01M16 18h.01M19.07 17.07a10.012 10.012 0 00-1.35 1.35M19 12h.01M3 12h.01M6 16h.01M7 8V8M16 4v.01M4.93 17.07A10.012 10.012 0 002.68 15.72M20 12h.01M8 12h.01M12 16h.01M4 4v.01M19 4v.01M12 20v.01M16 20v.01'></path></svg>
              ) : (
                <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l2 2M12 4v.01M19.07 6.93a10.012 10.012 0 00-1.35-1.35M16 10h.01M7 10H6.99M4.93 6.93A10.012 10.012 0 002.68 8.28M10 16h.01M14 16h.01M16 18h.01M19.07 17.07a10.012 10.012 0 00-1.35 1.35M19 12h.01M3 12h.01M6 16h.01M7 8V8M16 4v.01M4.93 17.07A10.012 10.012 0 002.68 15.72M20 12h.01M8 12h.01M12 16h.01M4 4v.01M19 4v.01M12 20v.01M16 20v.01'></path></svg>
              )}
            </button>
          </div>
          {errors.password && <FieldError message={errors.password.message!} />}
        </div>
        <button
          type='submit'
          className='w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Entrar
        </button>
        <div className='flex justify-end mt-4'>
          <a href='/signUp' className='text-blue-600 hover:underline'>
            Ainda não possui uma conta? Cadastra-se
          </a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};