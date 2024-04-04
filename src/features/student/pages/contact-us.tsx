import Breadcrumbs from '@/shared/components/breadcrumbs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useMemo } from 'react';
import JurusanImg from '@/assets/jurusan.png';
import LogoImg from '@/assets/logo.jpg';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const contactUsSchema = yup.object({
  name: yup.string().notRequired(),
  message: yup.string().notRequired(),
});

const ContactUs = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Kontak Kami',
        path: '',
      },
    ],
    []
  );

  const methods = useForm<yup.InferType<typeof contactUsSchema>>({
    resolver: yupResolver(contactUsSchema),
  });

  const handleSendEmail = (data: yup.InferType<typeof contactUsSchema>) => {
    window.open(
      `mailto:no-reply@example.com?body=${data?.message ?? ''}`,
      '_blank'
    );
  };

  const handleSendWA = (data: yup.InferType<typeof contactUsSchema>) => {
    window.open(
      `https://api.whatsapp.com/send?phone=${encodeURIComponent('+6281927101183')}&text=${encodeURIComponent(`Hallo saya, ${data?.name ?? ''}. ${data?.message ?? ''}`)}`,
      '_blank'
    );
  };

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <Card>
        <CardHeader>
          <CardTitle>Kontak Kami</CardTitle>
        </CardHeader>
        <hr className='pb-5' />
        <CardContent className='space-y-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='flex place-items-center gap-10 justify-self-center'>
              <img
                src={LogoImg}
                alt='UPI logo'
                className='size-24 lg:size-40 rounded-full'
              />
              <img src={JurusanImg} alt='Jurusan Logo' className='size-24 lg:size-40' />
            </div>

            <div className='flex flex-col space-y-5'>
              <Label>Hubungi Kami</Label>
              <Input placeholder='Masukan Nama' {...methods.register('name')} />
              <Textarea
                placeholder='Masukan Pesan'
                {...methods.register('message')}
              />
              <div className='flex gap-5'>
                <Button
                  variant='secondary'
                  className='flex-grow'
                  onClick={methods.handleSubmit(handleSendWA)}
                >
                  Kirim WA
                </Button>
                <Button
                  variant='default'
                  className='flex-grow'
                  onClick={methods.handleSubmit(handleSendEmail)}
                >
                  Kirim Email
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
