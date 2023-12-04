import { Navigate } from 'react-router-dom';
import { AppRoute } from '../app';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getUserAuthStatus } from '../../store/slices/user/selectors';
import { Spinner } from '../spinner/spinner.tsx';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getUserAuthStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  const { children } = props;
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export { PrivateRoute, AuthorizationStatus };
