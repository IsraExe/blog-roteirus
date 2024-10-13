'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import InputField from '@/components/InputField';
import FieldError from '@/components/FieldError';
import Label from '@/components/Label';
import fetchData from '@/utils/fetchData';
import { useFormWithZod } from '@/hooks/useFormWithZod';

const signUpSchema = z.object({
  name: z.string().min(1, 'O campo nome completo é obrigatório!').max(50, 'O campo nome completo deve ter no maximo 50 caracteres.'),
  email: z.string().min(1, 'O campo email é obrigatório!').email('Email inválido!').max(50, 'O campo email deve ter no maximo 50 caracteres.'),
  password: z.string().min(1, 'O campo senha é obrigatório!').max(64, 'O campo senha deve ter no maximo 64 caracteres.')
    .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial!')
    .regex(/.*[a-z].*/, 'A senha deve conter pelo menos uma letra minúscula!')
    .regex(/.*[A-Z].*/, 'A senha deve conter pelo menos uma letra maiúscula!')
    .regex(/.*\d.*/, 'A senha deve conter pelo menos um número!'),
  confirmPassword: z.string().min(1, 'O campo confirmar senha é obrigatório!'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'A senha de confirmação não pode ser diferente!',
  path: ['confirmPassword'],
});

type TSignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignUp = async (data: TSignUpSchema) => {
    const { response } = await fetchData({ method: 'POST', pathname: '/user/create', data });

    if (response.ok) return router.push('/?showModal=true');

    if (response.status === 500) setSignUpError('Ocorreu um erro no servidor, tente novamente mais tarde.');
    if (response.status === 409) setSignUpError('Não foi possível registrar sua conta pois o email já existe!');
  };

  const { register, handleFormSubmit, errors } = useFormWithZod({ schema: signUpSchema, onSubmit: handleSignUp });

  return (
    <main className='flex flex-col items-center mt-8 mx-auto'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold'>Roteirus - Cadastre-se</h1>
        {signUpError && <p className='text-red-500'>{signUpError}</p>}
      </div>

      <form className='mt-6 w-full space-y-4' noValidate onSubmit={handleFormSubmit}>
        <div>
          <Label text='Nome Completo' />
          <InputField {...register('name')} />
          {errors.name && <FieldError message={errors.name.message!} />}
        </div>

        <div>
          <Label text='Email' />
          <InputField {...register('email')} />
          {errors.email && <FieldError message={errors.email.message!} />}
        </div>

        <div>
          <Label text='Senha' />
          <InputField {...register('password')} type='password' />
          {errors.password && <FieldError message={errors.password.message!} />}
        </div>

        <div>
          <Label text='Confirme sua senha' />
          <InputField {...register('confirmPassword')} type='password' />
          {errors.confirmPassword && <FieldError message={errors.confirmPassword.message!} />}
        </div>

        <button
          type='submit'
          className='w-full py-2 mt-3 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Cadastrar
        </button>

        <div className='flex justify-end mt-4'>
          <a href='/login' className='text-sm text-blue-600 hover:underline'>
            Já possui uma conta? Faça o login
          </a>
        </div>
      </form>
    </main>
  );
};