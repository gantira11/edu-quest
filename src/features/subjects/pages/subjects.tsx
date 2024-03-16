import DataTable from '@/shared/components/data-table';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { IParams } from '@/shared/utils/interfaces';
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiSearchLine,
} from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getListSubject } from '../services';
import { ColumnDef } from '@tanstack/react-table';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import { debounce } from 'lodash';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {
  const [filters, setFilters] = useState<IParams>({
    page: 1,
    limit: 10,
    keyword: '',
  });

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['GET_LIST_SUBJECT', filters],
    queryFn: getListSubject,
  });

  const breadcrumbItem = [
    {
      label: 'Manajemen Materi',
      path: '',
    },
  ];

  const columnDef: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => {
          return <p className='w-max'>No</p>;
        },
        cell: ({ row }) => {
          return <p>{row.index + 1}</p>;
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
                      onClick={() => navigate(`/subjects/form/${data.id}`)}
                    >
                      <RiEditLine size={16} />
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
                    >
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black'>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
      },
    ],
    []
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
                className='absolute left-2 top-[9px] text-gray-500'
                size={18}
              />
            </div>
            <Button onClick={() => navigate('/subjects/form')}>
              Tambah Data
            </Button>
          </div>
          <DataTable
            columns={columnDef}
            data={data?.data?.data?.subjects}
            loading={isLoading}
            paginator={data?.data.data.paginator}
            onLimitChange={(e) => setFilters((prev) => ({ ...prev, limit: e }))}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Subjects;
