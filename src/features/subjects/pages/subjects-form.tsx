import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import * as yup from 'yup';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from '@/shared/components/form/input-form';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import Editor from '@/shared/components/ui/editor';
import { Button } from '@/shared/components/ui/button';
import { storage } from '@/config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { subjectSchema } from '../utils/validation-schema';
import { RiAddLine, RiDeleteBinLine } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createSubject, getDetailSubject } from '../services';
import { enqueueSnackbar } from 'notistack';

const SubjectForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const breadcrumbItem = useMemo(
    () => [
      {
        label: 'Manajemen Materi',
        path: '/subjects',
      },
      {
        label: 'Form',
        path: '',
      },
    ],
    []
  );

  const methods = useForm({
    resolver: yupResolver(subjectSchema),
    defaultValues: {
      videos: [
        {
          videoi_id: '',
          name: '',
          file_url: '',
        },
      ],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'videos',
  });

  useQuery({
    queryKey: ['GET_DETAIL_SUBJECT', params.id],
    queryFn: getDetailSubject,
  });

  const mutateSubject = useMutation({ mutationFn: createSubject });

  const onSubmit = (data: yup.InferType<typeof subjectSchema>) => {
    mutateSubject.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        enqueueSnackbar({
          variant: 'success',
          message: 'Materi berhasil disimpan',
        });
        navigate(-1);
      },
      onError: (err) => {
        enqueueSnackbar({ variant: 'error', message: 'Terjadi kesalahan' });
      },
    });
  };

  const handleUploadFirebase = (field: any, file: File | null) => {
    if (!file) return;

    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          field.onChange(downloadUrl);
        });
      }
    );
  };

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbItem} />

      <Card>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle>Tambah Materi</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-2 lg:px-4'>
          <FormProvider {...methods}>
            <form
              className='space-y-6'
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <InputForm label='Nama Materi' name='name' required />
              <Controller
                control={methods.control}
                name='content'
                render={({ field, fieldState }) => (
                  <div className='flex flex-col gap-2'>
                    <Label>Content</Label>
                    <Editor
                      value={field.value}
                      onChange={(
                        e: string
                        // editor: ReactQuill.UnprivilegedEditor
                      ) => {
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
              <div className='flex flex-col gap-2'>
                <Label>Video</Label>

                {fields.map((field, index) => (
                  <div className='flex w-full gap-3' key={field.id}>
                    <div className='w-full'>
                      <InputForm
                        name={`videos.${index}.name`}
                        placeholder='Nama Video'
                      />
                    </div>
                    <div className='w-full'>
                      <Controller
                        control={methods.control}
                        name={`videos.${index}.file_url`}
                        render={({ field, fieldState }) => (
                          <div>
                            <Input
                              type='file'
                              className='mt-1 w-full pt-[6px]'
                              onChange={(e) => {
                                handleUploadFirebase(
                                  field,
                                  e?.target?.files![0]
                                );
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
                    </div>
                    {index > 0 && (
                      <div>
                        <Button
                          size='icon'
                          className='mt-1 h-9 w-9'
                          type='button'
                          onClick={() => remove(index)}
                        >
                          <RiDeleteBinLine size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className='flex justify-end'>
                <Button
                  variant='ghost'
                  type='button'
                  onClick={() =>
                    append({
                      videoi_id: '',
                      name: '',
                      file_url: '',
                    })
                  }
                  className='flex gap-1'
                >
                  <RiAddLine size={20} />
                  Tambah Video
                </Button>
              </div>
              <div className='flex justify-end'>
                <Button>Simpan</Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectForm;
