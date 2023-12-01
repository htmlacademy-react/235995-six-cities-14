import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks/store.ts';
import { getUserAuthStatus } from '../../store/slices/user/selectors.ts';

type RedirectToMainRouteProps = {
  children: JSX.Element;
}

function RedirectToMainPage({ children }: RedirectToMainRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getUserAuthStatus);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Root}/>
      : children
  );
}

export { RedirectToMainPage };
