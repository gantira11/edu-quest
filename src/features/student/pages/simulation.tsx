import Breadcrumbs from '@/shared/components/breadcrumbs';
import { useMemo } from 'react';

const Simulation = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        label: 'Simulasi',
        path: '',
      },
    ],
    []
  );

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumbs items={breadcrumbs} />

      <iframe
        src='https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html'
        allowFullScreen
        title='game'
        width='100%'
        height={650}
      ></iframe>
    </div>
  );
};

export default Simulation;
