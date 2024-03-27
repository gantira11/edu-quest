import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { debounce } from 'lodash';
import { ColumnDef } from '@tanstack/react-table';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiSearchLine,
} from '@remixicon/react';

import DataTable from '@/shared/components/data-table';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
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
import { Button } from '@/shared/components/ui/button';

import { deleteSubject, getListSubject } from '../services';
import { ISubject } from '../utils/interfaces';

import { IParams } from '@/shared/utils/interfaces';

const Subjects = () => {
  const [selectedRow, setSelectedRow] = useState<ISubject | undefined>();
  const [filters, setFilters] = useState<IParams>({
    page: 1,
    limit: 10,
    keyword: '',
  });

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['GET_LIST_SUBJECT', filters],
    queryFn: getListSubject,
    select: (data) => data?.data.data,
  });
  const mutateDeleteSubject = useMutation({ mutationFn: deleteSubject });

  const breadcrumbItem = [
    {
      label: 'Manajemen Materi',
      path: '',
    },
  ];

  const handleDeleteSubject = useCallback(() => {
    mutateDeleteSubject.mutate(`${selectedRow?.id}`, {
      onSuccess: () => {
        enqueueSnackbar({
          variant: 'success',
          message: 'Materi berhasil dihapus',
        });
        refetch();
        // queryClient.refetchQueries();
        setSelectedRow(undefined);
      },
      onError: (err) => console.log(err),
    });
  }, [selectedRow]);

  const columnDef: ColumnDef<ISubject>[] = useMemo(
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
        accessorKey: 'name',
        header: 'Nama Materi',
        size: 1000,
      },
      {
        accessorKey: 'actions',
        header: () => {
          return <div className='w-full text-center'>Aksi</div>;
        },
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className='flex justify-center gap-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-full'
                      onClick={() => navigate(`/subjects/${data.id}`)}
                    >
                      <RiEyeLine size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black'>Detail</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-full'
                      onClick={() => navigate(`/subjects/form/${data.id}`)}
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
    [data?.paginator]
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbItem} />

      <Card className='rounded-lg border-slate-100 shadow-md'>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle>Materi</CardTitle>
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
            <Button onClick={() => navigate('/subjects/form')}>
              Tambah Data
            </Button>
          </div>
          <Dialog>
            <DataTable
              columns={columnDef}
              data={data?.subjects}
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
                  <Button size='sm' onClick={handleDeleteSubject}>
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

export default Subjects;
