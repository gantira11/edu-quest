import { RiLoader4Line } from '@remixicon/react';

const PageLoader = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <RiLoader4Line
        className='animate-spin text-center text-primary'
        size={32}
      />
    </div>
  );
};

export default PageLoader;
