import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layouts/sidebar';
import Header from '../components/layouts/header';
import PageLoader from '../components/page-loader';

const StudentLayout = () => {
  return (
    <section className='flex min-h-screen'>
      <Sidebar />
      <div className='ml-0 flex h-screen w-full flex-col lg:ml-72'>
        <Header />
        <React.Suspense fallback={<PageLoader />}>
          <div className='container mx-auto flex-grow p-5'>
            <Outlet />
          </div>
        </React.Suspense>
      </div>
    </section>
  );
};

export default StudentLayout;
