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
  const isEvaluasi = location.pathname.split('/').includes('evaluasi');

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_QUIZ', params.quizId],
    queryFn: getDetailQuiz,
    select: (data) => data?.data?.data,
  });

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
        label: `${data?.name ?? ''}`,
        path: '',
      },
    ],
    [data]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

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
      <div className='flex items-center justify-between'>
        <Breadcrumbs items={breadcrumbs} />
        {isEvaluasi && data ? (
          <Countdown
            minutes={data?.duration ?? 0}
            handleSubmitQuestion={handleSubmitQuestion}
          />
        ) : null}
      </div>

      <Card className='flex flex-col gap-8 p-4'>
        <div
          className='flex flex-col gap-4'
          key={data?.quetions[selectedIndex]?.id}
        >
          <h1 className='flex gap-2 text-base font-medium'>
            {selectedIndex + 1}.
            <p
              className='prose'
              dangerouslySetInnerHTML={{
                __html: data?.quetions[selectedIndex]?.name,
              }}
            ></p>
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
                <p
                  className='prose'
                  dangerouslySetInnerHTML={{ __html: `${option.name}` }}
                ></p>
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

interface CountdownProps {
  minutes: number;
  handleSubmitQuestion: () => void;
}

const Countdown: React.FC<CountdownProps> = ({
  minutes,
  handleSubmitQuestion,
}) => {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    if (seconds === 0) {
      handleSubmitQuestion();
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p className='text-sm font-medium'>
        Time Remaining: {formatTime(seconds)}
      </p>
    </div>
  );
};

export default Test;
