import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HowToUsePage = () => {
  const [section, setSection] = useState('Guru');

  const navigate = useNavigate();

  return (
    <section className='container mx-auto flex min-h-screen w-full items-center justify-center p-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex gap-4'>
            <h4>Tata Cara Penggunaan</h4>
          </CardTitle>
        </CardHeader>
        <CardContent className='px-10'>
          <div className='mb-10 flex justify-center gap-4'>
            <Button variant='link' onClick={() => setSection('Guru')}>
              Guru
            </Button>
            <Button variant='link' onClick={() => setSection('Siswa')}>
              Siswa
            </Button>
          </div>
          {section === 'Guru' && (
            <ul className='list-decimal text-sm'>
              <li>Login menggunakan akun guru</li>
              <li>Setelah masuk, klik garis 3 diujung kiri atas</li>
              <li>
                Akan muncul pilihan dashboard, tujuan pembelajaran, manajemen
                materi, manajemen user, dan report
              </li>
              <li>
                Untuk mengatur materi dan quiz, klik manajemen materi
                <ul className='ml-4 list-disc'>
                  <li>Klik "Tambah Data" untuk menambahkan materi dan video</li>
                  <li>
                    Klik icon mata di tabel nama materi untuk melihat materi
                    yang sudah di buat, sekaligus untuk membuat quiz
                  </li>
                  <li>Klik "Tambah Data" dimana quiz untuk menambah soal</li>
                  <li>
                    Guru dapat menambahkan soal berapapun serta menentukan bobot
                    nilai tiap soal, serta menentukan waktu pengerjaan
                  </li>
                  <li>
                    Pilih tipe quiz untuk menentukan pratest atau evaluasi
                  </li>
                </ul>
              </li>
              <li>
                Untuk mengatur akun siswa dan guru lain, klik manajemen user
                <ul className='ml-4 list-disc'>
                  <li>Klik "Tambah Data" untuk membuat akun</li>
                  <li>
                    Setelah masuk, tentukan role siswa/guru, lalu buat nama,
                    username, password sesuai keinginan guru
                  </li>
                </ul>
              </li>
              <li>Untuk melihat report nilai siswa, klik report</li>
            </ul>
          )}
          {section === 'Siswa' && (
            <ul className='list-decimal text-sm'>
              <li>Login menggunakan akun siswa</li>
              <li>Setelah masuk, klik garis 3 dibagian kiri atas</li>
              <li>
                Akan muncul pilihan simulasi dasar kelistrikan, materi, video
                pembelajaran, pratest, evaluasi, tentang kami, kontak kami
              </li>
              <li>
                Untuk mencoba simulasi rangkaian, klik menu simulasi dasar
                kelistrikan
              </li>
              <li>Untuk melihat materi, klik menu materi</li>
              <li>Untuk melihat video, klik menu video pembelajaran</li>
              <li>Untuk mengerjakan pratest, klik menu pratest</li>
              <li>Untuk mengerjakan evaluasi, klik menu evaluasi</li>
              <li>Untuk melihat profile pengembang, klik menu pengembang</li>
              <li>Untuk memberi masukan, klik menu kontak kami</li>
            </ul>
          )}
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button variant='outline' onClick={() => navigate(-1)}>
            Kembali
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default HowToUsePage;
