import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoader from '../components/page-loader';
import { useAuthStore } from '../stores/user-store';

const BaseLayout = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const handleAuth = () => {
    if (user?.role.name === 'student') {
      navigate('/student/home', { replace: true });

      return;
    }

    navigate('/dashboard');
  };

  useEffect(() => {
    console.log(user, 'USER HERE');
    if (user) {
      handleAuth();
    }
  }, [user]);

  return (
    <section>
      <React.Suspense fallback={<PageLoader />}>
        <Outlet />
      </React.Suspense>
    </section>
  );
};

export default BaseLayout;
