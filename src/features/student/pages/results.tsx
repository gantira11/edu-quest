import { getDetailQuiz } from '@/features/quiz/services';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { Option } from '@/features/quiz/utils/interfaces';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';
import { useAnswerStore } from '../stores/use-answer-store';

const Results = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_QUIZ', params.quizId],
    queryFn: getDetailQuiz,
    select: (data) => data?.data?.data,
  });

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Pra Test',
        path: `/student/pra-tests`,
      },
      {
        label: 'Quiz',
        path: `/student/pra-tests/${params.id}/quizzes`,
      },
      {
        label: `${data?.name}`,
        path: `/student/pra-tests/${params.id}/quizzes/${params.quizId}`,
      },
      {
        label: `Results`,
        path: '',
      },
    ],
    [data]
  );

  const answer = useAnswerStore((state) => state.answer);
  const resetState = useAnswerStore((state) => state.resetState);

  const handlePoint = () => {
    let point = 0;

    for (let i = 0; i < data?.quetions.length; i++) {
      const isCorrect = data?.quetions[1]?.options?.find(
        (option: Option) => option.is_correct === true
      );

      if (isCorrect?.id === answer[i]?.option_id) {
        point = point + 1;
      }
    }

    return `${(point * 100) / data?.quetions.length} / 100`;
  };

  useEffect(() => {
    if (data) {
      handlePoint();
    }
  }, [data]);

  const handleBackQuiz = () => {
    resetState();
    navigate(`../student/pra-tests/${params.id}/quizzes`, {
      replace: true,
    });
  };

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />
      <Card>
        <CardHeader>
          <CardTitle>Nilai</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='flex flex-col items-center justify-center gap-5 py-5'>
          <h5 className='text-lg font-medium'>Nilai anda adalah:</h5>
          <p className='text-2xl font-semibold'>{handlePoint()}</p>
        </CardContent>
        <CardFooter className='mt-5 flex gap-4'>
          <Button variant='outline' className='w-full' onClick={handleBackQuiz}>
            Kembali
          </Button>
          <Button
            className='w-full'
            onClick={() => {
              navigate('discussion');
            }}
          >
            Pembahasan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Results;
