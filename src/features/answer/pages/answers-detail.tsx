import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getAnswerDetail } from '../services';
import { cn } from '@/shared/utils/cn';

export interface AnswerModel {
  quiz_name: string;
  student_name: string;
  point: number;
  answers: Answer[];
}

export interface Answer {
  quetion: string;
  option: string[];
  user_answer: string;
  true_answer: string;
}

const AnswersDetail = () => {
  const params = useParams();

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Reports',
        path: '/reports',
      },
      {
        label: 'Detail',
        path: '',
      },
    ],
    []
  );

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_ANSWERS', `${params?.id}`],
    queryFn: getAnswerDetail,
    enabled: !!params?.id,
    select: (data) => data?.data?.data,
  });

  console.log(data);

  return (
    <section className='flex flex-col space-y-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader>
          <CardTitle>{data?.quiz_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-5'>
            {data?.answers?.map((answer: Answer, index: number) => {
              return (
                <div
                  className='flex flex-col gap-4 border-b pb-5'
                  key={`${answer.quetion}.${index}`}
                >
                  <div className='flex gap-2'>
                    <p>{index + 1}.</p>

                    <div
                      dangerouslySetInnerHTML={{ __html: answer?.quetion }}
                    ></div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    {answer.option.map((el) => (
                      <div
                        className={cn(
                          'rounded-md border border-gray-300 p-3',
                          el === answer.true_answer &&
                            'border-2 border-green-600',
                          el !== answer.true_answer &&
                            el === answer.user_answer &&
                            'border-2 border-red-600'
                        )}
                        key={el}
                      >
                        <div dangerouslySetInnerHTML={{ __html: el }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AnswersDetail;
