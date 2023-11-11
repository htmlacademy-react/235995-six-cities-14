import { Navigate } from 'react-router-dom';
import { AppRoute } from '../app';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/store';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const { children} = props;
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export { PrivateRoute, AuthorizationStatus };
