import React from 'react';
import {Outlet} from 'react-router-dom';

const StudentLayout = () => {
  return (
    <section>
      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </section>
  );
};

export default StudentLayout;
