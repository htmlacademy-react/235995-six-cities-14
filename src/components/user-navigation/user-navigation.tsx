import { AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks/store.ts';
import { UserLogin } from '../user-login/user-login.tsx';
import { UserLogout } from '../user-logout/user-logout.tsx';
import { getUserAuthStatus } from '../../store/slices/user/selectors.ts';

function UserNavigation() {
  const authorizationStatus = useAppSelector(getUserAuthStatus);
  return (
    authorizationStatus === AuthorizationStatus.Auth ? <UserLogin /> : <UserLogout />
  );
}

export {UserNavigation};
