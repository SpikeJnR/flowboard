import { useAppSelector } from '../../hooks/hooks-selectors.ts';
import { getAuthStatus } from '../../store/user-slice/user-selectors.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const.ts';
import LoadingScreen from '../../pages/loading-screen';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.UNKNOWN) {
    return <LoadingScreen />;
  }

  return authStatus === AuthorizationStatus.AUTH ? (
    children
  ) : (
    <Navigate to={AppRoute.LOGIN} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
