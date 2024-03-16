import React from 'react';
import {Outlet} from 'react-router-dom';

const BaseLayout = () => {
  return (
    <section>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </React.Suspense>
    </section>
  );
};

export default BaseLayout;
