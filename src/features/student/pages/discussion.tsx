import { getDetailQuiz } from '@/features/quiz/services';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import { useQuery } from '@tanstack/react-query';
import { map } from 'lodash';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/shared/components/ui/card';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/components/ui/button';
import { useAnswerStore } from '../stores/use-answer-store';
import { Option } from '@/features/quiz/utils/interfaces';

const Discussion = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_QUIZ', params.quizId],
    queryFn: getDetailQuiz,
    select: (data) => data?.data?.data,
  });

  const location = useLocation();
  const isEvaluasi = location.pathname.split('/').includes('evaluasi');

  const breadcrumbs = useMemo(
    () => [
      {
        label: isEvaluasi ? 'Evaluasi' : 'Pra Test',
        path: `/student/${isEvaluasi ? 'evaluasi' : 'pra-tests'}`,
      },
      {
        label: 'Quiz',
        path: `/student/${isEvaluasi ? 'evaluasi' : 'pra-tests'}/${params.id}/quizzes`,
      },
      {
        label: `${data?.name}`,
        path: `/student/${isEvaluasi ? 'evaluasi' : 'pra-tests'}/${params.id}/quizzes/${params.quizId}`,
      },
      {
        label: `Results`,
        path: `/student/${isEvaluasi ? 'evaluasi' : 'pra-tests'}/${params.id}/quizzes/${params.quizId}/result`,
      },
      {
        label: `Pembahasan`,
        path: '',
      },
    ],
    [data]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const answer = useAnswerStore((state) => state.answer);
  const resetState = useAnswerStore((state) => state.resetState);

  const handleNextQuestion = () => {
    setSelectedIndex((prev) => prev + 1);
  };

  const handlePrevQuestion = () => {
    setSelectedIndex((prev) => prev - 1);
  };

  const handleBack = () => {
    resetState();

    if (isEvaluasi) {
      navigate(`/student/evaluasi/${params.id}/quizzes`, {
        replace: true,
      });

      return;
    }

    navigate(`/student/pra-tests/${params.id}/quizzes`, {
      replace: true,
    });
  };

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card className='flex flex-col gap-8 p-4'>
        <div
          className='flex flex-col gap-4'
          key={data?.quetions[selectedIndex]?.id}
        >
          <h1 className='flex gap-2 text-base font-medium'>
            {selectedIndex + 1}.
            <p
              className='prose bg-red-50'
              dangerouslySetInnerHTML={{
                __html: data?.quetions[selectedIndex]?.name,
              }}
            ></p>
          </h1>
          <div className='flex flex-col gap-2'>
            {map(data?.quetions[selectedIndex].options, (option: Option) => (
              <div
                className={cn(
                  'cursor-pointer rounded-md border px-3 py-2 hover:bg-slate-50',
                  answer[selectedIndex]?.option_id === option.id &&
                    'border-2 border-primary',
                  answer[selectedIndex]?.option_id !== option.id &&
                    option.is_correct &&
                    'border-2 border-green-500'
                )}
                key={option.id}
              >
                <p
                  className='prose'
                  dangerouslySetInnerHTML={{ __html: `${option.name}` }}
                ></p>
              </div>
            ))}
          </div>
          <div className='rounded-md border border-gray-200 p-4 text-sm '>
            <h4 className='font-medium'>Pembahasan: </h4>
            <div
              className='prose'
              dangerouslySetInnerHTML={{
                __html: data?.quetions[selectedIndex].discuss,
              }}
            ></div>
          </div>
        </div>
      </Card>
      <div className='flex justify-end gap-5'>
        {selectedIndex > 0 && (
          <Button type='button' variant='outline' onClick={handlePrevQuestion}>
            Kembali
          </Button>
        )}
        <Button
          type='button'
          onClick={
            selectedIndex === data?.quetions.length - 1
              ? handleBack
              : handleNextQuestion
          }
        >
          {selectedIndex < data?.quetions?.length - 1
            ? 'Selanjutnya'
            : 'Selesai'}
        </Button>
      </div>
    </div>
  );
};

export default Discussion;
