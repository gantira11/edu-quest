import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';

import { Button } from '@/shared/components/ui/button';
import InputForm from '@/shared/components/form/input-form';
import { useAuthStore } from '@/shared/stores/user-store';
import { login } from '../services';

const loginSchema = yup.object({
  username: yup.string().required().label('Username'),
  password: yup.string().required().label('Password'),
});

const LoginForm = () => {
  const [togglePassword, setTogglePassword] = React.useState(true);

  const navigate = useNavigate();

  const persistUser = useAuthStore((state) => state.persistUser);

  const mutateLogin = useMutation({ mutationFn: login });

  const methods = useForm<yup.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const renderTogglePassword = () => (
    <button
      className='absolute right-2 top-[10px] cursor-pointer text-slate-700'
      onClick={() => setTogglePassword((prev) => !prev)}
      type='button'
    >
      {togglePassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
    </button>
  );

  const onSubmit = (data: yup.InferType<typeof loginSchema>) => {
    mutateLogin.mutate(data, {
      onSuccess: (res) => {
        enqueueSnackbar({ variant: 'success', message: 'Login berhasil' });
        localStorage.setItem('user', JSON.stringify(res.data?.data));
        persistUser(res.data.data);
        if (res.data.data.role.name === 'admin') {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/student/home', { replace: true });
        }
      },
      onError: () =>
        enqueueSnackbar({
          variant: 'error',
          message: 'Username atau password salah',
        }),
    });
  };

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex flex-col gap-1'>
        <h5 className='text-lg font-semibold text-slate-700'>
          Login Edu Quest
        </h5>
        <p className='text-xs text-slate-500  '>
          Masukan username dan password untuk melanjutkan
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
          <InputForm label='Username' required name='username' />
          <InputForm
            label='Password'
            required
            name='password'
            suffixIcon={renderTogglePassword()}
            type={togglePassword ? 'password' : 'text'}
          />

          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
