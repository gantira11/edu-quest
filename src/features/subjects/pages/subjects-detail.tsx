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
import { getDetailSubject } from '../services';
import { Label } from '@/shared/components/ui/label';

import QuizTable from '@/features/quiz/components/quiz-table';
import { IVideo } from '../utils/interfaces';

const SubjectDetail = () => {
  const params = useParams();

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_SUBJECT', params.id],
    queryFn: getDetailSubject,
    select: (data) => data.data.data,
    enabled: !!params.id,
  });

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Manajemen Materi',
        path: '/subjects',
      },
      {
        label: data?.name,
        path: '#',
      },
    ],
    [data?.name]
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader className='px-2 py-5 lg:p-4'>
          <CardTitle className='text-xl'>{data?.name}</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-2 lg:px-4'>
          <article
            className='prose prose-sm'
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></article>

          <hr className='' />

          <Label className='text-base font-medium'>Videos: </Label>
          <div className='grid grid-cols-1 gap-5 rounded-md md:grid-cols-2 lg:grid-cols-3'>
            {data?.videos.map((video: IVideo) => (
              <div
                className='flex flex-col items-center gap-3 overflow-hidden rounded-md p-4 shadow'
                key={video.id}
              >
                <Label className='font-medium'>{video.name}</Label>
                <iframe
                  title={video.id}
                  src={video.file_url}
                  className='aspect-auto'
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <QuizTable subject={data} />
    </div>
  );
};

export default SubjectDetail;
