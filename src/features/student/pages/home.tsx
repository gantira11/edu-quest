import Breadcrumbs from '@/shared/components/breadcrumbs';
import { useMemo } from 'react';

import HomeImg from '@/assets/home.svg';

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

  return (
    <div className='flex min-h-[80vh] flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <div className='flex flex-grow flex-col items-center justify-center'>
        <div className='flex w-full flex-grow flex-col-reverse items-center justify-center gap-10 text-center lg:flex-row lg:text-end'>
          <img src={HomeImg} alt='home' width={160} height={160} />
          <p className='w-full text-lg lg:w-1/2'>
            Selamat datang di{' '}
            <b>Web Pembelajaran Sistem Sistem Starter Sepeda Motor</b>
          </p>
        </div>
      </div>
      <p className='text-center text-sm font-medium'>
        KI/KD dan Indikator Pencapaian Kompetensi
      </p>
    </div>
  );
};

export default Home;
