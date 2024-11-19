'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { fetchClient } from '@/utils/fetchClient';

import InputField from '@/components/InputField';
import FieldError from '@/components/FieldError';
import { useFormWithZod } from '@/hooks/useFormWithZod';

import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

const loginSchema = z.object({
  email: z.string().min(1, 'O campo email é obrigatório!').email('Email inválido!'),
  password: z.string().min(1, 'O campo senha é obrigatório!')
});

type TLoginSchema = z.infer<typeof loginSchema>;

export default function Login() {

  const [loginError, setLoginError] = useState<string | null>(null);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlelogin = async (data: TLoginSchema) => {
    const { response } = await fetchClient({ method: 'POST', pathname: '/user/login', bodyContent:data });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      return router.push('/');
    };

    if (response.status === 500) setLoginError('Ocorreu um erro no servidor, tente novamente mais tarde.');
    if (response.status === 401) setLoginError('Email e/ou senha incorreto(s)!');
  };

  const { register, handleFormSubmit, errors } = useFormWithZod<TLoginSchema>({ schema: loginSchema, onSubmit: handlelogin });

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 h-full'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-900'>Roteirus - Login</h1>
        {loginError && <p className='text-red-600 mt-2'>{loginError}</p>}
      </div>
      <form onSubmit={handleFormSubmit} className='w-full max-w-sm bg-white p-8 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <InputField
            {...register('email')}
          />
          {errors.email && <FieldError message={errors.email.message!} />}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Senha</label>
          <div className='relative'>
            <InputField
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type='button'
              onClick={handleClickShowPassword}
              className='absolute  inset-y-0 right-0 flex items-center pr-3'
            >
              {showPassword && <FaRegEyeSlash size={20} className='text-gray-500' />}
              {!showPassword && <FaRegEye size={20} className='text-gray-500' />}
            </button>
          </div>

          {errors.password && <FieldError message={errors.password.message!} />}
        </div>
        <button
          type='submit'
          className='mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Entrar
        </button>
        <div className='flex justify-end mt-4'>
          <a href='/cadastre-se' className='text-blue-600 hover:underline'>
            Ainda não possui uma conta? Cadastra-se
          </a>
        </div>
      </form>
    </div>
  );
};