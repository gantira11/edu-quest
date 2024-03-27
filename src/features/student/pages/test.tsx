import { getDetailQuiz } from '@/features/quiz/services';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { cn } from '@/shared/utils/cn';
import { useMutation, useQuery } from '@tanstack/react-query';
import { map } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAnswerStore } from '../stores/use-answer-store';
import { submitAnswer } from '../services';
import { enqueueSnackbar } from 'notistack';

const Test = () => {
  const params = useParams();
  const navigate = useNavigate();

  const location = useLocation();

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
        path: '',
      },
    ],
    [data]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const isEvaluasi = location.pathname.split('/').includes('evaluasi');

  const answer = useAnswerStore((state) => state.answer);
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const assignOption = useAnswerStore((state) => state.assignOption);

  const mutateSubmitAnswer = useMutation({ mutationFn: submitAnswer });

  const handlePrevQuestion = () => {
    setSelectedIndex((prev) => prev - 1);
    setSelectedOption(answer[selectedIndex - 1]?.option_id ?? undefined);
  };

  const handleNextQuestion = () => {
    assignOption(selectedIndex, selectedOption);
    setSelectedIndex((prev) => prev + 1);
    setSelectedOption(answer[selectedIndex + 1]?.option_id ?? undefined);
  };

  const handleSubmitQuestion = () => {
    assignOption(selectedIndex, selectedOption);

    if (isEvaluasi) {
      const payload = {
        quiz_id: params.quizId,
        quetions: answer,
      };

      mutateSubmitAnswer.mutate(payload, {
        onSuccess: () => {
          enqueueSnackbar({
            variant: 'success',
            message: 'Berhasil submit quiz',
          });

          navigate('result');
        },
        onError: () => {
          enqueueSnackbar({ variant: 'error', message: 'Gagal submit quiz' });
        },
      });

      return;
    }

    navigate('result');
  };

  useEffect(() => {
    if (data) {
      setAnswer(data?.quetions);
    }
  }, [data]);

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card className='flex flex-col gap-8 p-4'>
        <div
          className='flex flex-col gap-4'
          key={data?.quetions[selectedIndex]?.id}
        >
          <h1 className='text-base font-medium'>
            {selectedIndex + 1}. {data?.quetions[selectedIndex]?.name}
          </h1>
          <div className='flex flex-col gap-2'>
            {map(data?.quetions[selectedIndex].options, (option) => (
              <div
                className={cn(
                  'cursor-pointer rounded-md border px-3 py-2 hover:bg-slate-50',
                  selectedOption === option.id && 'border-2 border-primary'
                )}
                key={option.id}
                onClick={() => {
                  setSelectedOption(option.id);
                }}
              >
                {option.name}
              </div>
            ))}
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
              ? handleSubmitQuestion
              : handleNextQuestion
          }
          disabled={!selectedOption}
        >
          {selectedIndex < data?.quetions.length - 1 ? 'Selanjutnya' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default Test;
