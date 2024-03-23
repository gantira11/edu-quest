import { getListQuiz } from '@/features/quiz/services';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { IParams } from '@/shared/utils/interfaces';
import { RiSearchLine } from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { debounce, map } from 'lodash';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Quizzes = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<IParams>({
    id: params.id,
    page: 1,
    limit: 10,
    keyword: '',
  });

  const { data } = useQuery({
    queryKey: ['GET_LIST_QUIZ', filters],
    queryFn: getListQuiz,
    select: (data) => data?.data?.data,
  });

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Pra Test',
        path: '/student/pra-tests',
      },
      {
        label: 'Quiz',
        path: 'pra-tests',
      },
    ],
    []
  );

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

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {map(data?.quizzes, (quiz) => (
          <Card
            className='cursor-pointer hover:bg-slate-50'
            key={quiz.id}
            onClick={() => navigate(`${quiz?.id}`)}
          >
            <CardHeader>
              <CardTitle>{quiz.name}</CardTitle>
              <CardDescription>
                Total Pertanyaan: {quiz.total_quetions}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
