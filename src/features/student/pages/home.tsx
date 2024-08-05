import Breadcrumbs from '@/shared/components/breadcrumbs';
import { useMemo } from 'react';

import HomeImg from '@/assets/home.png';
import { useQuery } from '@tanstack/react-query';
import { getDetailObjective } from '../services';

const Home = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Home',
        path: '',
      },
    ],
    []
  );

  const { data } = useQuery({
    queryKey: ['GET_DETAIL_OBJECTIVES'],
    queryFn: getDetailObjective,
    select: (data) => data?.data?.data,
  });


  return (
    <div className='flex min-h-[80vh] flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <div className='flex flex-grow flex-col items-center justify-center'>
        <div className='flex w-full flex-grow flex-col-reverse items-center justify-center gap-10 text-center lg:flex-row lg:text-end'>
          <img src={HomeImg} alt='home' width={240} height={240} />

          <p className='w-full text-lg lg:w-1/2'>
            Selamat datang di{' '}
            <b>Materi Pembelajaran Dasar Elektronika Otomotif</b>
          </p>
        </div>
      </div>
      <div>
        <p className='text-center text-sm font-medium'>{data?.title}</p>
        <div className='flex justify-center'>
          <p
            dangerouslySetInnerHTML={{ __html: data?.body }}
            className='prose'
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
