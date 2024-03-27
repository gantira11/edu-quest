import Breadcrumbs from '@/shared/components/breadcrumbs';
import DataTable from '@/shared/components/data-table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { IParams } from '@/shared/utils/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getAnswerList } from '../services';
import { ColumnDef } from '@tanstack/react-table';
import { IAnswer } from '../utils/interfaces';
import { Input } from '@/shared/components/ui/input';
import { debounce } from 'lodash';
import { RiSearchLine } from '@remixicon/react';

const Answers = () => {
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

  const { data, isLoading } = useQuery({
    queryKey: ['GET_LIST_REPORTS', filters],
    queryFn: getAnswerList,
    select: (data) => data?.data?.data,
  });

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
          {/* <Dialog> */}

          <DataTable
            columns={columnDef}
            data={data?.answers}
            loading={isLoading}
            paginator={data?.paginator}
            onLimitChange={(e) => setFilters((prev) => ({ ...prev, limit: e }))}
            onPageChange={(e) => setFilters((prev) => ({ ...prev, page: e }))}
          />

          {/* <DialogContent>
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
            </DialogContent> */}
          {/* </Dialog> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Answers;
