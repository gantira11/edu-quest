import NoDataImg from '@/assets/no-data.svg';
import { cn } from '@/shared/utils/cn';
import { FC } from 'react';
import { Label } from './label';

interface NoDataProps {
  className?: string;
}

const NoData: FC<NoDataProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex min-h-[60vh] w-full flex-col items-center justify-center gap-5',
        className
      )}
    >
      <img src={NoDataImg} alt='no data' className='size-36' />
      <Label>Data Tidak Ditemukan</Label>
    </div>
  );
};

export default NoData;
