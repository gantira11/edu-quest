import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/shared/stores/user-store';

interface ProtectedRouteProps {
  element: JSX.Element;
  rolePermission: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  rolePermission,
}) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to='/' />;
  }

  if (!rolePermission.includes(user?.role?.name)) {
    return <Navigate to='/' />;
  }

  return element;
};

export default ProtectedRoute;
