import { Box, FormControl, Input, InputAdornment, InputLabel, Typography, Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import styles from './Login.module.scss';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';

const createUserFormSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatório!').email('Formato de email inválido!'),
  password: z.string().nonempty('A senha é obrigatória!')
});

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(createUserFormSchema)
  });

  console.log(formState.errors)

  const handleLogin = (data) => {

    console.log(data)

  };

  return (
    <Box className={styles.container} as='form' onSubmit={handleSubmit(handleLogin)}>
      <Typography variant='h1' fontWeight='bold' fontSize='2rem' alignSelf='center'>
        Faça seu login
      </Typography>
      <FormControl variant='standard'>
        <InputLabel htmlFor='email'>
          Email
        </InputLabel>
        <Input
          {...register('email')}
          id='email'
          startAdornment={
            <InputAdornment position='start'>
              <MailOutlineIcon color='secondary' />
            </InputAdornment>
          }
        />
        {formState.errors.email && <Typography color='error' fontSize={14}> {formState.errors.email.message} </Typography>}
      </FormControl>
      <FormControl variant='standard'>
        <InputLabel htmlFor='password'>
          Password
        </InputLabel>
        <Input
          {...register('password')}
          id='password'
          type='password'
          startAdornment={
            <InputAdornment position='start'>
              <VpnKeyOutlinedIcon color='secondary' />
            </InputAdornment>
          }
        />
          {formState.errors.password && <Typography color='error' fontSize={14}> {formState.errors.password.message} </Typography>}
      </FormControl>
      <Button type='submit' variant='contained'>
        Login
      </Button>
    </Box>
  );
};

export default Login;