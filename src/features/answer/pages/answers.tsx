import Breadcrumbs from '@/shared/components/breadcrumbs';
import DataTable from '@/shared/components/data-table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { IParams } from '@/shared/utils/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { deleteAnswer, getAnswerList } from '../services';
import { ColumnDef } from '@tanstack/react-table';
import { IAnswer } from '../utils/interfaces';
import { Input } from '@/shared/components/ui/input';
import { debounce } from 'lodash';
import { RiDeleteBinLine, RiEyeLine, RiSearchLine } from '@remixicon/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { Button } from '@/shared/components/ui/button';
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
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const Answers = () => {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState<IAnswer | undefined>();
  const [filters, setFilters] = useState<IParams>({
    page: 1,
    limit: 10,
    keyword: '',
  });

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Reports',
        path: '',
      },
    ],
    []
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['GET_LIST_REPORTS', filters],
    queryFn: getAnswerList,
    select: (data) => data?.data?.data,
  });
  const mutateDeleteAnswer = useMutation({ mutationFn: deleteAnswer });

  const handleDelete = () => {
    mutateDeleteAnswer.mutate(`${selectedRow?.id}`, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: 'success',
          message: 'Data berhasil dihapus',
        });
        refetch();
      },
      onError: (err) => {
        console.log(err);
        enqueueSnackbar({ variant: 'success', message: 'Data gagal dihapus' });
      },
    });
  };

  const columnDef: ColumnDef<IAnswer>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => {
          return <p className='w-max'>No</p>;
        },
        cell: ({ row }) => {
          const no =
            parseInt(data.paginator.page) * parseInt(data.paginator.limit) -
            parseInt(data.paginator.limit) +
            row.index +
            1;
          return <p>{no}</p>;
        },
        size: 50,
      },
      {
        accessorKey: 'quiz.name',
        header: 'Nama Quiz',
        size: 1000,
      },
      {
        accessorKey: 'user.name',
        header: 'Nama Siswa',
        size: 1000,
      },
      {
        accessorKey: 'point',
        header: 'Nilai',
        size: 1000,
      },
      {
        accessorKey: 'actions',
        header: () => {
          return <div className='w-full text-center'>Aksi</div>;
        },
        size: 10,
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className='mx-3 flex justify-center gap-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-full'
                      onClick={() => navigate(`${data.id}`)}
                    >
                      <RiEyeLine size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black'>Detail</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button
                        size='icon'
                        variant='outline'
                        className='rounded-full'
                        type='button'
                        onClick={() => setSelectedRow(data)}
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
    [data?.paginator]
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card className='rounded-lg border-slate-100 shadow-md'>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle>Reports</CardTitle>
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
                className='absolute left-2 top-[9px] text-gray-500 '
                size={18}
              />
            </div>
            {/* <Button onClick={() => navigate('/subjects/form')}>
              Tambah Data
            </Button> */}
          </div>
          <Dialog>
            <DataTable
              columns={columnDef}
              data={data?.answers}
              loading={isLoading}
              paginator={data?.paginator}
              onLimitChange={(e) =>
                setFilters((prev) => ({ ...prev, limit: e }))
              }
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
                  <Button size='sm' onClick={handleDelete}>
                    Ya
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default Answers;
