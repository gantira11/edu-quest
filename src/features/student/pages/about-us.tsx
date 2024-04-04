import Breadcrumbs from '@/shared/components/breadcrumbs';
import { useMemo } from 'react';

import Me from '@/assets/me.jpg';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

const AboutUs = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Tentang Pengembang',
        path: '',
      },
    ],
    []
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader>
          <CardTitle>Tentang Pengembang</CardTitle>
        </CardHeader>
        <hr className='pb-5' />
        <CardContent className='space-y-10'>
          <div className='flex flex-col items-center gap-10 lg:flex-row'>
            <img
              src={Me}
              alt='Saya'
              className='h-60 w-60 rounded-lg object-cover'
            />
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='text-sm font-medium w-32'>Nama</h4>
                <p className='text-sm'>Muhammad Rhenaldy Tedjaputra</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='text-sm font-medium w-32'>NIM</h4>
                <p className='text-sm'>2000537</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='text-sm font-medium w-32'>Prodi</h4>
                <p className='text-sm'>Pendidikan Teknik Otomotif</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='text-sm font-medium w-32'>Tempat, Tgl Lahir</h4>
                <p className='text-sm'>Bandung, 15 Februari 2002</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='text-sm font-medium w-32'>Alamat</h4>
                <p className='text-sm'>
                  Jl Cikutra Gg Neglasari III No 7A Bandung
                </p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='text-sm font-medium w-32'>Motto hidup:</h4>
                <p className='text-sm'>Life is journey, from Allah to Allah</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-5'>
            <h4 className='text-lg font-medium'>Dibimbing Oleh: </h4>
            <div className='flex flex-col lg:flex-row justify-center gap-10'>
              <div className='flex flex-col items-center'>
                <h5 className='font-semibold'>Pembimbing 1</h5>
                <p className='text-center'>Drs. Ir. Tatang Permana, M.Pd</p>
              </div>
              <div className='flex flex-col items-center'>
                <h5 className='font-semibold'>Pembimbing 2</h5>
                <p className='text-center'>Dr. Ridwan Adam Muhammad Noor, S.Pd., M.Pd.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
