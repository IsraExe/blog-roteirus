'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Link, Grid, Box, Typography, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from '@mui/material';

import MovieIcon from '@mui/icons-material/Movie';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import fetchData from '@/utils/fetchData';

import Copyright from '@/components/Footer';
import InputField from '@/components/InputField';
import FieldError from '@/components/FieldError';

import styles from './page.module.css';

const signInSchema = z.object({
  email: z.string().min(1, 'O campo email é obrigatório!').email('Email inválido!'),
  password: z.string().min(1, 'O campo senha é obrigatório!')
});

type TSignInSchema = z.infer<typeof signInSchema>;

export default function SignIn() {

  const [signInError, setSignInError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const redirectFromSignUp = searchParams.get('showModal');

  const notify = () => toast('Usuário cadastrado com sucesso!');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (Boolean(redirectFromSignUp)) {
      notify();

      router.replace(pathname, undefined);
    };
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
      return router.push('/home')
    };

    if (response.status === 500) setSignInError('Ocorreu um erro no servidor, tente novamente mais tarde.');
    if (response.status === 401) setSignInError('Email e/ou senha incorreto(s)!');

  };

  return (
    <Box component='main' maxWidth='xs' className={styles['signin-container']}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MovieIcon sx={{ color: '#570404', fontSize: '90px' }} />
        <Typography component='h1' variant='h4' color="white">
          Roteirus - Login
        </Typography>
        <Typography component='p' sx={{ color: 'red' }}>
          {signInError}
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit(handleSignIn)} mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                {...register('email')}
                label='Email'
              />
              {errors.email && <FieldError message={errors.email.message!} />}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Senha
                </InputLabel>
                <OutlinedInput
                  autoComplete='off'
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff sx={{ color: 'primary.main' }} /> : <Visibility sx={{ color: 'primary.main' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Senha'
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.dark',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                />
              </FormControl>

              {errors.password && <FieldError message={errors.password.message!} />}
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, color: 'white', textTransform: 'none' }}
          >
            Entrar
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link color='inherit' href='/signUp' variant='body2'>
                Ainda não possui uma conta? Cadastra-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />

      <ToastContainer />
    </Box>
  );
}