import Breadcrumbs from '@/shared/components/breadcrumbs';
import InputForm from '@/shared/components/form/input-form';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import Editor from '@/shared/components/ui/editor';
import { Label } from '@/shared/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { objectiveSchema } from '../utils/validation-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createObjectives,
  getObjectivesDetail,
  updateObjectives,
} from '../services';
import { enqueueSnackbar } from 'notistack';
import { InferType } from 'yup';

const ObjectivesForm = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Tujuan Pembelajaran',
        path: '/objectives',
      },
      {
        label: 'Form',
        path: '',
      },
    ],
    []
  );

  const navigate = useNavigate();
  const params = useParams();

  const queryClient = useQueryClient();

  const methods = useForm({ resolver: yupResolver(objectiveSchema) });

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_OBJECTIVE', `${params?.id}`],
    queryFn: getObjectivesDetail,
    enabled: !!params.id,
    select: (data) => data?.data?.data,
  });

  const mutateCreate = useMutation({
    mutationFn: createObjectives,
    onSuccess: () => {
      enqueueSnackbar({
        variant: 'success',
        message: 'Tujuan Pembelajaran berhasil disimpan',
      });
      queryClient.invalidateQueries();
      navigate(-1);
    },
    onError: () => {
      enqueueSnackbar({
        variant: 'error',
        message: 'Tujuan Pembelajaran gagal disimpan',
      });
    },
  });

  const mutateUpdate = useMutation({
    mutationFn: updateObjectives,
    onSuccess: () => {
      enqueueSnackbar({
        variant: 'success',
        message: 'Tujuan Pembelajaran berhasil diubah',
      });
      queryClient.invalidateQueries();
      navigate(-1);
    },
    onError: () => {
      enqueueSnackbar({
        variant: 'error',
        message: 'Tujuan Pembelajaran gagal diubah',
      });
    },
  });

  const onSubmit = (data: InferType<typeof objectiveSchema>) => {
    if (params.id) {
      mutateUpdate.mutate({ id: params.id, data });
      return;
    }

    mutateCreate.mutate(data);
  };

  useEffect(() => {
    if (data) {
      methods.reset({ title: data?.title, body: data?.body });
    }
  }, [data]);

  return (
    <section className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card className='flex flex-col gap-5'>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle>Tambah Tujuan Pembelajaran</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-2 lg:px-4'>
          <FormProvider {...methods}>
            <form
              className='space-y-6'
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <InputForm
                label='Nama Tujuan Pembelajaran'
                name='title'
                required
              />
              <Controller
                control={methods.control}
                name='body'
                render={({ field, fieldState }) => (
                  <div className='flex flex-col gap-2'>
                    <Label>Body</Label>
                    <Editor
                      value={field.value}
                      onChange={(e: string) => {
                        field.onChange(e);
                      }}
                    />
                    {fieldState.invalid && (
                      <small className='text-xs text-red-600'>
                        {fieldState.error?.message}
                      </small>
                    )}
                  </div>
                )}
              />

              <div className='flex justify-end'>
                <Button>{params.id ? 'Ubah' : 'Simpan'}</Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </section>
  );
};

export default ObjectivesForm;
