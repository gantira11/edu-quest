import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoader from '../components/page-loader';
import Cookies from 'js-cookie';

const BaseLayout = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    const session = JSON.parse(Cookies.get('user') as string);

    if (session.state.user !== null) {
      if (session.state.user.role.name === 'student') {
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
