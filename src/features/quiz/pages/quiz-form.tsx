import Breadcrumbs from '@/shared/components/breadcrumbs';
import InputForm from '@/shared/components/form/input-form';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import Editor from '@/shared/components/ui/editor';
import { cn } from '@/shared/utils/cn';
import { yupResolver } from '@hookform/resolvers/yup';

import { RiAddLine, RiDeleteBin2Line } from '@remixicon/react';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { quizSchema } from '../utils/validation-schema';
import { InferType } from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQuiz,
  deleteOption,
  deleteQuestion,
  getDetailQuiz,
  updateQuiz,
} from '../services';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from '@/main';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';

const QuizForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Manajemen Materi',
        path: '/subjects',
      },
      {
        label: location?.state.name,
        path: `/subjects/${location.state.id}`,
      },
      {
        label: 'Form',
        path: '#',
      },
    ],
    []
  );

  const methods = useForm({
    resolver: yupResolver(quizSchema),
    defaultValues: {
      name: '',
      subject_id: location.state.id,
      quetions: [
        {
          name: '',
          discuss: '',
          options: [
            {
              name: '',
              is_correct: false,
            },
          ],
        },
      ],
    },
    mode: 'onChange',
  });

  const { data } = useQuery({
    queryKey: ['GET DETAIL QUIZ', params.quizId],
    queryFn: getDetailQuiz,
    enabled: !!params.quizId,
    select: (data) => data?.data?.data,
  });

  const mutateCreateQuiz = useMutation({ mutationFn: createQuiz });
  const mutateUpdateQuiz = useMutation({ mutationFn: updateQuiz });
  const mutateDeleteQuestion = useMutation({ mutationFn: deleteQuestion });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'quetions',
  });

  const handleDeleteQuestion = useCallback((index: number, field: any) => {
    if (field.id) {
      mutateDeleteQuestion.mutate(field.id, { onSuccess: () => remove(index) });
    }
    remove(index);
  }, []);

  const onSubmit = (data: InferType<typeof quizSchema>) => {
    if (params.quizId) {
      const payload: InferType<typeof quizSchema> = {
        name: data.name,
        // subject_id: '',
        duration: data.duration,
        category: data?.category,
        quetions: data.quetions?.map((question) => ({
          id: question.id,
          name: question.name,
          weight: question.weight ?? null,
          discuss: question.discuss,
          options: question.options?.map((option) => ({
            id: option.id,
            name: option.name,
            is_correct: option.is_correct,
          })),
        })),
      };

      mutateUpdateQuiz.mutate(
        { id: params.quizId, data: payload },
        {
          onSuccess: () => {
            enqueueSnackbar({
              variant: 'success',
              message: 'Quiz berhasil diubah',
            });
            queryClient.invalidateQueries();
            navigate(-1);
          },
          onError: () => {
            enqueueSnackbar({
              variant: 'error',
              message: 'Quiz gagal diubah',
            });
          },
        }
      );

      return;
    }

    mutateCreateQuiz.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: 'success',
          message: 'Quiz berhasil disimpan',
        });
        queryClient.invalidateQueries();
        navigate(-1);
      },
      onError: () => {
        enqueueSnackbar({ variant: 'error', message: 'Quiz gagal disimpan' });
      },
    });
  };

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data]);

  console.log(methods.formState.errors);

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader>
          <CardTitle>Tambah Quiz</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-2 lg:px-4'>
          <FormProvider {...methods}>
            <form
              className='space-y-6'
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <InputForm label='Nama Quiz' name='name' placeholder='Quiz' />
              <InputForm
                label='Durasi (Menit)'
                name='duration'
                placeholder='Durasi'
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              <div className='flex flex-col gap-2'>
                <Label>Tipe Quiz</Label>
                <Controller
                  control={methods.control}
                  name='category'
                  render={({ field, fieldState }) => (
                    <div>
                      <Select
                        onValueChange={(e) => field.onChange(e)}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            fieldState.invalid && 'border-2 border-red-600'
                          )}
                        >
                          <SelectValue
                            placeholder='Pilih Tipe Quiz'
                            className='placeholder:text-slate-200'
                          />
                        </SelectTrigger>
                        <SelectContent className='w-max'>
                          <SelectGroup>
                            <SelectItem value='Pra Test'>Pra Test</SelectItem>
                            <SelectItem value='Evaluasi'>Evaluasi</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <small className='text-xs text-red-600'>
                          {fieldState.error?.message}
                        </small>
                      )}
                    </div>
                  )}
                />
              </div>

              {fields.map((field, index) => (
                <div className='flex flex-col gap-5' key={field.id}>
                  <div className={cn('flex items-stretch gap-2')}>
                    <div className='w-full'>
                      {/* <InputForm
                        label={`Pertanyaan ${index + 1}`}
                        name={`quetions.${index}.name`}
                        placeholder='Pertanyaan'
                      /> */}
                      <Controller
                        control={methods.control}
                        name={`quetions.${index}.name`}
                        render={({ field }) => (
                          <Editor
                            value={field.value}
                            onChange={(e: string) => {
                              field.onChange(e);
                            }}
                          />
                        )}
                      />
                    </div>
                    <InputForm
                      label='Bobot Nilai'
                      name={`quetions.${index}.weight`}
                      placeholder='Bobot Nilai'
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                    <div>
                      <Button
                        type='button'
                        size='icon'
                        className='mt-6 h-8 w-8'
                        onClick={() =>
                          handleDeleteQuestion(
                            index,
                            methods.getValues(`quetions.${index}`)
                          )
                        }
                      >
                        <RiDeleteBin2Line size={16} />
                      </Button>
                    </div>
                  </div>

                  <Options index={index} key={field.id} />

                  <div className='flex flex-col gap-2'>
                    <Label className='text-sm font-medium'>Pembahasan</Label>
                    <Controller
                      control={methods.control}
                      name={`quetions.${index}.discuss`}
                      render={({ field }) => (
                        <Editor
                          value={field.value}
                          onChange={(e: string) => {
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                className='w-full'
                size='sm'
                variant='outline'
                type='button'
                onClick={() =>
                  append({
                    name: '',
                    discuss: '',
                    weight: 0,
                    options: [{ name: '', is_correct: false }],
                  })
                }
              >
                <RiAddLine size={16} />
                Tambah Pertanyaan
              </Button>
              <div className='flex justify-end'>
                <Button>{params.quizId ? 'Ubah' : 'Simpan'}</Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

interface OptionsProps {
  index: number;
}

const Options: React.FC<OptionsProps> = ({ index }) => {
  const methods = useFormContext();

  const mutateDeleteOption = useMutation({ mutationFn: deleteOption });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: `quetions.${index}.options`,
  });

  const handleDelete = useCallback((index: number, field: any) => {
    if (field.id) {
      mutateDeleteOption.mutate(field.id, {
        onSuccess: (res) => {
          console.log(res);
          remove(index);
        },
      });
    }
    remove(index);
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <Label className='text-sm'>Jawaban</Label>
      <div className='space-y-4'>
        {fields.map((field, idx) => (
          <div className='flex items-stretch gap-2' key={field.id}>
            <div className='w-full'>
              <div className='flex items-stretch gap-2'>
                <Controller
                  control={methods.control}
                  name={`quetions.${index}.options.${idx}.is_correct`}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        className='mt-[18px]'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    );
                  }}
                />
                <div className='w-full'>
                  <Controller
                    control={methods.control}
                    name={`quetions.${index}.options.${idx}.name`}
                    render={({ field }) => (
                      <Editor
                        value={field.value}
                        onChange={(e: string) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              type='button'
              size='icon'
              className='mt-[10px] h-8 w-8'
              onClick={() =>
                handleDelete(
                  idx,
                  methods.getValues(`quetions.${index}.options.${idx}`)
                )
              }
            >
              <RiDeleteBin2Line size={16} />
            </Button>
          </div>
        ))}
        <div className='flex justify-end'>
          <Button
            size='sm'
            type='button'
            variant='ghost'
            className='gap-2'
            onClick={() =>
              append({
                name: '',
                is_correct: false,
              })
            }
          >
            <RiAddLine size={16} />
            Tambah Jawaban
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
