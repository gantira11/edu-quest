import { getListSubject } from '@/features/subjects/services';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { IParams } from '@/shared/utils/interfaces';
import { RiSearchLine } from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { debounce, map } from 'lodash';
import { useMemo, useState } from 'react';
import MateriImg from '@/assets/materi.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const PraTest = () => {
  const location = useLocation();

  const isEvaluasi = location.pathname.split('/').includes('evaluasi');

  const breadcrumbs = useMemo(
    () => [
      {
        label: isEvaluasi ? 'Evaluasi' : 'Pra Test',
        path: '',
      },
    ],
    [isEvaluasi]
  );

  // ===================

  const navigate = useNavigate();

  const [filters, setFilters] = useState<IParams>({
    page: 1,
    limit: 1000,
    keyword: '',
  });

  // ===================

  const { data } = useQuery({
    queryKey: ['GET_LIST_MATERI', filters],
    queryFn: getListSubject,
    select: (data) => data?.data?.data,
  });

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />
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
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        {map(data?.subjects, (subject) => (
          <Card
            key={subject.id}
            className='flex cursor-pointer flex-col items-center justify-center hover:bg-slate-50'
            onClick={() => navigate(`${subject.id}/quizzes`)}
          >
            <CardHeader>
              <img src={MateriImg} width={120} height={120} />
            </CardHeader>
            <CardContent>
              <p className='text-sm font-medium'>{subject.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PraTest;
