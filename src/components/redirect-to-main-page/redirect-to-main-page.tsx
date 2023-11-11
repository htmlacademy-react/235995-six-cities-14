import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks/store.ts';

type RedirectToMainRouteProps = {
  children: JSX.Element;
}

function RedirectToMainPage({ children }: RedirectToMainRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Root}/>
      : children
  );
}

export { RedirectToMainPage };
