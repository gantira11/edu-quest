import { getDetailSubject } from '@/features/subjects/services';
import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { map } from 'lodash';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const VideosDetail = () => {
  const params = useParams();

  // ===================

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_SUBJECT', params.id],
    queryFn: getDetailSubject,
    select: (data) => data?.data?.data,
  });

  // ===================

  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Videos',
        path: '/student/videos',
      },
      {
        label: `${data?.name}`,
        path: '',
      },
    ],
    [data]
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
        </CardHeader>

        <Separator className='mb-10' />

        <CardContent>
          {map(data?.videos, (video) => (
            <Card
              className='flex w-full flex-col gap-2 overflow-hidden rounded-sm lg:w-max'
              key={video.id}
            >
              {/* <video src={video.file_url} controls width={250}></video> */}
              <video controls width={250}>
                <source src={video.file_url} type='video/mp4' />
                <track kind='captions' label='English' />
                Your browser does not support the video tag.
              </video>

              <CardContent>
                <p className='text-center text-sm font-medium'>{video.name}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideosDetail;
