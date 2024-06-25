import Breadcrumbs from '@/shared/components/breadcrumbs';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getListObjective } from '../services';
import { ColumnDef } from '@tanstack/react-table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import DataTable from '@/shared/components/data-table';
import { useNavigate } from 'react-router-dom';
import { IParams } from '@/shared/utils/interfaces';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { RiEditLine } from '@remixicon/react';

const Objectives = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Tujuan Pembelajaran',
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

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['GET_LIST_OBJECTIVE', filters],
    queryFn: getListObjective,
    select: (data) => data?.data?.data,
  });

  const columnDef: ColumnDef<any>[] = useMemo(
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
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'body',
        header: 'Body',
        cell: ({ row }) => {
          const data = row.original;
          return <div dangerouslySetInnerHTML={{ __html: data.body }}></div>;
        },
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
                      onClick={() => navigate(`form/${data.id}`)}
                    >
                      <RiEditLine size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black'>Edit</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
      },
    ],
    [data?.paginator]
  );

  console.log(data, 'HERE');

  return (
    <section className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card className='rounded-lg border-slate-100 shadow-md'>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle>Tujuan Pembelajaran</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 px-2 lg:px-4'>
          <div className='flex justify-end gap-4'>
            {data?.objectives.length < 1 && (
              <Button onClick={() => navigate('form')}>Tambah Data</Button>
            )}
          </div>

          <DataTable
            columns={columnDef}
            data={data?.objectives}
            loading={isLoading}
            paginator={data?.paginator}
            onLimitChange={(e) => setFilters((prev) => ({ ...prev, limit: e }))}
            onPageChange={(e) => setFilters((prev) => ({ ...prev, page: e }))}
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default Objectives;
