import DataTable from '@/shared/components/data-table';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { IParams } from '@/shared/utils/interfaces';
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiSearchLine,
} from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { deleteQuiz, getListQuiz } from '../services';
import { ColumnDef } from '@tanstack/react-table';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { enqueueSnackbar } from 'notistack';
import { queryClient } from '@/main';
import { ISubject } from '@/features/subjects/utils/interfaces';
import { IQuiz } from '../utils/interfaces';

interface QuizTableProps {
  subject: ISubject;
}

const QuizTable: FC<QuizTableProps> = ({ subject }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [selectedRow, setSelectedRow] = useState<IQuiz | undefined>();
  const [filters, setFilters] = useState<IParams>({
    id: params.id,
    page: 1,
    limit: 10,
    keyword: '',
  });

  const mutateDeleteQuiz = useMutation({ mutationFn: deleteQuiz });

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['GET_LIST_QUIZ', filters],
    queryFn: getListQuiz,
    select: (data) => data.data.data,
  });

  const columnDef: ColumnDef<IQuiz>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => {
          return <p className='w-max'>No</p>;
        },
        cell: ({ row }) => {
          const no =
            parseInt(quiz?.paginator.page) * parseInt(quiz?.paginator.limit) -
            parseInt(quiz?.paginator.limit) +
            row.index +
            1;
          return <p>{no}</p>;
        },
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Nama Quiz',
        size: 1000,
      },
      {
        accessorKey: 'total_quetions',
        header: 'Total Pertanyaan',
        size: 1000,
      },
      {
        accessorKey: 'actions',
        header: () => {
          return <div className='w-full text-center'>Aksi</div>;
        },
        cell: ({ row }) => {
          const data = row?.original;
          return (
            <div className='flex justify-center gap-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-full'
                      onClick={() =>
                        navigate(`/subjects/${subject.id}/quiz/${data.id}`, {
                          state: subject,
                        })
                      }
                    >
                      <RiEyeLine size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black'>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-full'
                      onClick={() =>
                        navigate(
                          `/subjects/${subject.id}/quiz/form/${data.id}`,
                          {
                            state: subject,
                          }
                        )
                      }
                    >
                      <RiEditLine size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black'>Edit</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button
                        size='icon'
                        variant='outline'
                        className='rounded-full'
                        onClick={() => {
                          setSelectedRow(data);
                        }}
                      >
                        <RiDeleteBinLine size={16} />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black'>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
      },
    ],
    [quiz?.paginator]
  );

  const handleDeleteQuiz = () => {
    mutateDeleteQuiz.mutate(`${selectedRow?.id}`, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: 'success',
          message: 'Quiz berhasil dihapus',
        });
        setSelectedRow(undefined);
        queryClient.invalidateQueries();
      },
    });
  };

  return (
    <Card>
      <CardHeader className='px-2 py-5 lg:p-4'>
        <CardTitle className='text-xl'>Quiz</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-3 px-2 lg:px-4'>
        <div className='flex gap-4'>
          <div className='relative w-full'>
            <Input
              placeholder='Cari'
              className='px-8'
              onChange={debounce(
                (e) =>
                  setFilters((prev) => ({
                    ...prev,
                    page: 1,
                    keyword: e.target.value,
                  })),
                500
              )}
            />
            <RiSearchLine
              className='absolute left-2 top-[9px] text-gray-500'
              size={18}
            />
          </div>
          <Button onClick={() => navigate('quiz/form', { state: subject })}>
            Tambah Data
          </Button>
        </div>
        <Dialog>
          <DataTable
            columns={columnDef}
            data={quiz?.quizzes}
            loading={isLoading}
            paginator={quiz?.paginator}
            onLimitChange={(e) => setFilters((prev) => ({ ...prev, limit: e }))}
            onPageChange={(e) => setFilters((prev) => ({ ...prev, page: e }))}
          />

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete data</DialogTitle>
              <DialogDescription>
                Apakah anda yakin delete data ini?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className='flex justify-end gap-1'>
              <DialogClose asChild>
                <Button size='sm' variant='outline'>
                  Tidak
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button size='sm' onClick={handleDeleteQuiz}>
                  Ya
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default QuizTable;
