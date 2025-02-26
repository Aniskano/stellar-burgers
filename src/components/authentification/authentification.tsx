import { PropsWithChildren, FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';
import { useUserStore } from 'services';

interface Props {
  onlyUnAuth?: boolean;
}

export type ProtectedRouteProps = PropsWithChildren<Props>;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const { user, fetch: fetchUser, loading } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};
