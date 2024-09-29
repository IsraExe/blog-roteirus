'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, Link, Grid, Box, Typography } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

import InputField from '@/components/InputField';
import FieldError from '@/components/FieldError';
import fetchData from '@/utils/fetchData';

import styles from './page.module.css';

const signUpSchema = z.object({
  name: z.string().min(1, 'O campo nome completo é obrigatório!').max(50, 'O campo nome completo deve ter no maximo 50 caracteres.'),
  email: z.string().min(1, 'O campo email é obrigatório!').email('Email inválido!').max(50, 'O campo email deve ter no maximo 50 caracteres.'),
  password: z.string().min(1, 'O campo senha é obrigatório!').max(64, 'O campo senha deve ter no maximo 64 caracteres.')
    .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial!')
    .regex(/.*[a-z].*/, 'A senha deve conter pelo menos uma letra minúscula!')
    .regex(/.*[A-Z].*/, 'A senha deve conter pelo menos uma letra maiúscula!')
    .regex(/.*\d.*/, 'A senha deve conter pelo menos um número!'),
  confirmPassword: z.string().min(1, 'O campo confirmar senha é obrigatório!'),
  idRole: z.number(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'A senha de confirmação não pode ser diferente!',
  path: ['confirmPassword'],
});

type TSignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  setValue('idRole', 1);

  const handleSignUp = async (data: TSignUpSchema) => {

    const { response } = await fetchData({ method: 'POST', pathname: '/user/create', data });

    if (response.ok) return router.push('/?showModal=true');

    if (response.status === 500) setSignUpError('Ocorreu um erro no servidor, tente novamente mais tarde.');
    if (response.status === 409) setSignUpError('Não foi possível registrar sua conta pois o email já existe!');

  };

  return (
    <Box component='main' maxWidth='xs' className={styles['signup-container']}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MovieIcon sx={{ color: '#570404', fontSize: '90px' }} />
        <Typography component='h1' variant='h4'>
          Roteirus - Cadastre-se
        </Typography>
        <Typography component='p' sx={{ color: 'red' }}>
          {signUpError}
        </Typography>
        <Box sx={{ maxWidth: '60%' }}>
          <Box component='form' noValidate onSubmit={handleSubmit(handleSignUp)} mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  {...register('name')}
                  label='Nome Completo'
                />
                {errors.name && <FieldError message={errors.name.message!} />}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  {...register('email')}
                  label='Email'
                />
                {errors.email && <FieldError message={errors.email.message!} />}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  {...register('password')}
                  label='Password'
                  type='password'
                />
                {errors.password && <FieldError message={errors.password.message!} />}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  {...register('confirmPassword')}
                  label='Confirme sua Senha'
                  type='password'
                />
                {errors.confirmPassword && <FieldError message={errors.confirmPassword.message!} />}
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, color: 'white', textTransform: 'none' }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link color='inherit' href='/login' variant='body2'>
                  Já possui uma conta? Faça o login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}