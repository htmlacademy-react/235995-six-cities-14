import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchUserData, logoutAction } from '../../store/api-actions.ts';
import { store } from '../../store/index.ts';
import { Spinner } from '../spinner/spinner.tsx';

store.dispatch(fetchUserData());

function UserNavigation() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const offers = useAppSelector((state) => state.offers.offers);
  const favoriteCardCount = offers.filter((offer) => offer.isFavorite).length;
  const userData = useAppSelector((state) => state.user.userData);
  const handleLogout = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };
  const loadingStatus = useAppSelector((state) => state.user.isUserDataLoading);
  if (loadingStatus) {
    return <Spinner />;
  }
  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={'/favorites'} >
              <div className="header__avatar-wrapper user__avatar-wrapper">
                <img src={userData?.avatarUrl} alt={userData?.name} />
              </div>
              <span className="header__user-name user__name">{userData?.email}</span>
              <span className="header__favorite-count">{favoriteCardCount}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link onClick={handleLogout} className="header__nav-link" to={'/'}>
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      </nav> :
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={'/login'}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
  );
}

export {UserNavigation};
