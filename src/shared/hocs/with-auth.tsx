import { FC, ComponentType, useEffect } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import { useAuthStore } from '../stores/user-store';

export interface WithAuthProps {
  rolePermission: string[];
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P & WithAuthProps> => {
  const WithAuth: FC<P & WithAuthProps> = ({ rolePermission, ...props }) => {
    const user = useAuthStore((state) => state.user);

    if (!user) {
      return <Navigate to='/' />;
    }

    if (user.role.name === 'admin') {
      <Navigate to='/dashboard' />;
    }

    useEffect(() => {
      if (!user) {
        redirect('/');
      }

      if (user.role.name === 'admin') {
        redirect('/dashboard');
      }

      if (user.role.name !== 'admin') {
        redirect('/');
      }
    }, []);

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};

export default withAuth;
