import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLoader from '../components/page-loader';

const BaseLayout = () => {
  return (
    <section>
      <React.Suspense fallback={<PageLoader />}>
        <Outlet />
      </React.Suspense>
    </section>
  );
};

export default BaseLayout;
