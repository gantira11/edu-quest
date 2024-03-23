import React from 'react';
import { Outlet } from 'react-router-dom';

import PageLoader from '../components/page-loader';
import Header from '../components/layouts/header';
import Sidebar from '../components/layouts/sidebar';

const CmsLayout = () => {
  return (
    <section className='flex min-h-screen'>
      <Sidebar />
      <div className='ml-0 flex w-full flex-col lg:ml-72'>
        <Header />
        <React.Suspense fallback={<PageLoader />}>
          <div className='container mx-auto p-5'>
            <Outlet />
          </div>
        </React.Suspense>
      </div>
    </section>
  );
};

export default CmsLayout;
