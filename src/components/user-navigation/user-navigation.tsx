import { AuthorizationStatus } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchUserData } from '../../store/api-actions.ts';
import { Spinner } from '../spinner/spinner.tsx';
import { useEffect } from 'react';
import { UserLogin } from '../user-login/user-login.tsx';
import { UserLogout } from '../user-logout/user-logout.tsx';
import { getUserAuthStatus, isUserDataLoading } from '../../store/slices/user/selectors.ts';

function UserNavigation() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getUserAuthStatus);

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchUserData());
    }
  }, [dispatch, authorizationStatus]);

  const loadingStatus = useAppSelector(isUserDataLoading);
  if (loadingStatus) {
    return <Spinner />;
  }
  return (
    authorizationStatus === AuthorizationStatus.Auth ? <UserLogin /> : <UserLogout />
  );
}

export {UserNavigation};
