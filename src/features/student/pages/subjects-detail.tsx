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
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const SubjectsDetail = () => {
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
        label: 'Materi',
        path: '/student/subjects',
      },
      {
        label: `${data?.name ?? ''}`,
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
          <div
            dangerouslySetInnerHTML={{ __html: data?.content }}
            className='prose'
          ></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectsDetail;
