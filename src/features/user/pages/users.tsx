import Breadcrumbs from '@/shared/components/breadcrumbs';
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
import { RiDeleteBinLine, RiEditLine, RiSearchLine } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getListUser } from '../services';
import { IParams } from '@/shared/utils/interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { IUser } from '../utils/interfaces';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { queryClient } from '@/main';

const Users = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Manajemen User',
        path: '',
      },
    ],
    []
  );

  const [filters, setFilters] = useState<IParams>({
    page: 1,
    limit: 10,
    keyword: '',
  });
  const [selectedRow, setSelectedRow] = useState<IUser | undefined>();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['GET_LIST_USER', filters],
    queryFn: getListUser,
    select: (data) => data?.data?.data,
  });
  const mutateDeleteUser = useMutation({ mutationFn: deleteUser });

  const columnDef: ColumnDef<IUser>[] = useMemo(
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
        header: 'Nama User',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'role.name',
        header: 'Role',
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
            <div className='flex justify-center gap-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-full'
                      onClick={() => navigate(`/users/form/${data.id}`)}
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

  const handleDeleteUser = () => {
    mutateDeleteUser.mutate(selectedRow?.id, {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: () => {},
    });
  };

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

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
            <Button onClick={() => navigate('/users/form')}>Tambah Data</Button>
          </div>
          <Dialog>
            <DataTable
              columns={columnDef}
              data={data?.users}
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
                  <Button size='sm' onClick={handleDeleteUser}>
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

export default Users;
