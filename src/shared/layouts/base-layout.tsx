import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoader from '../components/page-loader';
import { useAuthStore } from '../stores/user-store';

const BaseLayout = () => {
  const navigate = useNavigate();
  const persistUser = useAuthStore((state) => state.persistUser);

  const handleAuth = () => {
    const storageUser = localStorage.getItem('user');
    if (storageUser !== null) {
      const user = JSON.parse(storageUser);
      persistUser(user);

      if (user?.role?.name === 'student') {
        navigate('/student/home', { replace: true });
        return;
      }

      navigate('/dashboard', { replace: true });
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <section>
      <React.Suspense fallback={<PageLoader />}>
        <Outlet />
      </React.Suspense>
    </section>
  );
};

export default BaseLayout;
