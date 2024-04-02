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
              <div className='flex'>
                <h4 className='w-32 text-sm font-medium'>Nama</h4>
                <p className='text-sm'>Muhammad Rhenaldy Tedjaputra</p>
              </div>
              <div className='flex'>
                <h4 className='w-32 text-sm font-medium'>NIM</h4>
                <p className='text-sm'>2000537</p>
              </div>
              <div className='flex'>
                <h4 className='w-32 text-sm font-medium'>Prodi</h4>
                <p className='text-sm'>Pendidikan Teknik Otomotif</p>
              </div>
              <div className='flex'>
                <h4 className='w-32 text-sm font-medium'>Tempat, Tgl Lahir</h4>
                <p className='text-sm'>Bandung, 15 Februari 2002</p>
              </div>
              <div className='flex'>
                <h4 className='w-32 text-sm font-medium'>Alamat</h4>
                <p className='text-sm'>
                  Jl Cikutra Gg Neglasari III No 7A Bandung
                </p>
              </div>
              <div className='flex'>
                <h4 className='w-32 text-sm font-medium'>Motto hidup:</h4>
                <p className='text-sm'>Life is journey, from Allah to Allah</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-5'>
            <h4 className='text-lg font-medium'>Dibimbing Oleh: </h4>
            <div className='flex justify-center gap-10'>
              <div className='flex flex-col'>
                <h5 className='font-semibold'>Pembimbing 1</h5>
                <p>Drs. Ir. Tatang Permana, M.Pd</p>
              </div>
              <div className='flex flex-col'>
                <h5 className='font-semibold'>Pembimbing 2</h5>
                <p>Dr. Ridwan Adam Muhammad Noor, S.Pd., M.Pd.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
