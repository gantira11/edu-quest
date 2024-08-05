import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import { useQuery } from '@tanstack/react-query';
import { getDetailQuiz } from '../services';
import { map } from 'lodash';
import { cn } from '@/shared/utils/cn';
import { Quetion } from '../utils/interfaces';

const QuizDetail = () => {
  const params = useParams();
  const location = useLocation();

  const { data } = useQuery({
    queryKey: ['GET DETAIL QUIZ', params.quizId],
    queryFn: getDetailQuiz,
    enabled: !!params.quizId,
    select: (data) => data?.data?.data,
  });

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Manajemen Materi',
        path: '/subjects',
      },
      {
        label: location.state.name,
        path: `/subjects/${location.state.id}`,
      },
      {
        label: data?.name,
        path: '#',
      },
    ],
    [data]
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle className='text-xl'>{data?.name}</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-2 text-sm lg:px-4'>
          {map(data?.quetions, (question: Quetion, index) => (
            <div
              key={question.id}
              className='flex flex-col gap-3 rounded-md border p-4'
            >
              <h5 className='font-medium'>
                {/* {index + 1} . {question.name} */}
                {index + 1}.{' '}
                <p
                  dangerouslySetInnerHTML={{ __html: `${question?.name}` }}
                  className='prose'
                ></p>
              </h5>
              {map(question.options, (option) => (
                <div
                  className={cn(
                    'cursor-pointer rounded-md border p-2 hover:bg-slate-50',
                    option.is_correct && 'border-2 border-green-500'
                  )}
                >
                  <p
                    dangerouslySetInnerHTML={{ __html: `${option?.name}` }}
                  ></p>
                </div>
              ))}
              <div className='flex flex-col gap-2 rounded-lg border p-3'>
                <p className='font-medium'>Pembahasan:</p>
                <div
                  dangerouslySetInnerHTML={{ __html: question.discuss ?? '' }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDetail;
