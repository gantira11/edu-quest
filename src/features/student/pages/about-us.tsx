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
                <h4 className='w-32 text-sm font-medium'>Nama</h4>
                <p className='text-sm'>Muhammad Rhenaldy Tedjaputra</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='w-32 text-sm font-medium'>NIM</h4>
                <p className='text-sm'>2000537</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='w-32 text-sm font-medium'>Prodi</h4>
                <p className='text-sm'>Pendidikan Teknik Otomotif</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='w-32 text-sm font-medium'>Tempat, Tgl Lahir</h4>
                <p className='text-sm'>Bandung, 15 Februari 2002</p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='w-32 text-sm font-medium'>Alamat</h4>
                <p className='text-sm'>
                  Jl Cikutra Gg Neglasari III No 7A Bandung
                </p>
              </div>
              <div className='flex flex-col lg:flex-row'>
                <h4 className='w-32 text-sm font-medium'>Motto hidup:</h4>
                <p className='text-sm'>Life is journey, from Allah to Allah</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-5'>
            <h4 className='text-lg font-medium'>Dibimbing Oleh: </h4>
            <div className='flex flex-col justify-center gap-10 lg:flex-row'>
              <div className='flex flex-col gap-2'>
                <h5 className='text-center text-sm font-semibold'>
                  Pembimbing 1
                </h5>
                <p>Drs. Ir. Tatang Permana, M.Pd</p>
                <p className='text-sm font-semibold'>
                  Mata kuliah yang diampu:
                </p>
                <ul className='ml-5 list-disc text-sm'>
                  <li>Kajian Teknologi dan Vokasi</li>
                  <li>Chasis Otomotif</li>
                  <li>Kelistrikan Body Otomotif</li>
                  <li>Manajemen Bengkel Otomotif</li>
                  <li>Manajemen Bengkel</li>
                  <li>Teknologi Transfortasi Darat</li>
                  <li>Motor Industri</li>
                  <li>Kelistrikan Engine Otomotif (T+P)</li>
                </ul>
              </div>
              <div className='flex flex-col gap-2'>
                <h5 className='text-center text-sm font-semibold'>
                  Pembimbing 2
                </h5>
                <p>Dr. Ridwan Adam Muhammad Noor, S.Pd., M.Pd.</p>
                <p className='text-sm font-semibold'>
                  Mata kuliah yang diampu:
                </p>
                <ul className='ml-5 list-disc text-sm'>
                  <li>Teknologi Bahan Bakar dan Pelumas</li>
                  <li>Teknologi Pengecetan Body Otomotif</li>
                  <li>Motor Bensin II</li>
                  <li>Kontrol Elektronik Otomotif</li>
                  <li>Teknik Sepeda Motor</li>
                  <li>Air Conditioning</li>
                  <li>Ergonomik dan Teknik Kerja Otomotif (T+P)</li>
                  <li>Teknologi Bahan Bakar dan Pelumas</li>
                  <li>Teknologi Sepeda Motor (T-P)</li>
                  <li>AC Otomotif (T-P)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
