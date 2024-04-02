import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { userSchema } from '../utils/validation-schema';
import { InferType } from 'yup';
import InputForm from '@/shared/components/form/input-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';
import { Button } from '@/shared/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createUser, getDetailUser, updateUser } from '../services';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';

const UsersForm = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Manajemen User',
        path: '/users',
      },
      {
        label: 'Form',
        path: '',
      },
    ],
    []
  );

  // ==================

  const navigate = useNavigate();
  const params = useParams();

  const [togglePassword, setTogglePassword] = useState(true);

  const renderTogglePassword = () => (
    <button
      className='absolute right-2 top-[10px] cursor-pointer text-slate-700'
      onClick={() => setTogglePassword((prev) => !prev)}
      type='button'
    >
      {togglePassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
    </button>
  );

  // ==================

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_USER', params.id],
    queryFn: getDetailUser,
    enabled: !!params.id,
    select: (data) => data?.data.data,
  });
  const mutateCreateUser = useMutation({ mutationFn: createUser });
  const mutateUpdateUser = useMutation({ mutationFn: updateUser });

  // =================

  const methods = useForm<InferType<typeof userSchema>>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: InferType<typeof userSchema>) => {
    if (params.id) {
      mutateUpdateUser.mutate(
        { id: params.id, data: data },
        {
          onSuccess: () => {
            enqueueSnackbar({
              variant: 'success',
              message: 'User berhasil diubah',
            });

            navigate(-1);
          },
          onError: (err) => {
            enqueueSnackbar({
              variant: 'error',
              message:
                (err as any)?.response?.data?.meta?.message ??
                'User gagal diubah ',
            });
          },
        }
      );

      return;
    }

    mutateCreateUser.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: 'success',
          message: 'User berhasil disimpan',
        });

        navigate(-1);
      },
      onError: () => {
        enqueueSnackbar({
          variant: 'error',
          message: 'User gagal disimpan',
        });
      },
    });
  };

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data?.name,
        username: data?.username,
        role_id: data?.role_id,
        password: undefined,
      });
    }
  }, [data]);

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle>Tambah User</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-2 lg:px-4'>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-6'
            >
              <div className='flex flex-col gap-6 lg:flex-row'>
                <div className='w-full'>
                  <InputForm
                    label='Nama'
                    placeholder='Nama'
                    name='name'
                    className='w-full'
                  />
                </div>
                <div className='flex w-full flex-col gap-2'>
                  <Label>Role</Label>
                  <Controller
                    control={methods.control}
                    name='role_id'
                    render={({ field, fieldState }) => (
                      <>
                        <Select
                          onValueChange={(e) => field.onChange(e)}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={cn(
                              fieldState.invalid && 'border-red-700'
                            )}
                          >
                            <SelectValue placeholder='Pilih Role' />
                          </SelectTrigger>
                          <SelectContent className='w-max'>
                            <SelectGroup>
                              <SelectItem value='14bf4a2b-2b58-4661-aafb-524d29a74a9c'>
                                Siswa
                              </SelectItem>
                              <SelectItem value='a6f9948f-3f6a-47f6-9ca9-9f3f8aa0155e'>
                                Guru
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <small className='text-xs text-red-600'>
                            {fieldState.error?.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <InputForm
                label='Username'
                name='username'
                placeholder='Username'
              />
              <InputForm
                label='Password'
                name='password'
                placeholder='Password'
                suffixIcon={renderTogglePassword()}
                type={togglePassword ? 'password' : 'text'}
              />

              <div className='col-span-2 flex justify-end'>
                <Button>{params.id ? 'Ubah' : 'Simpan'}</Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersForm;
