import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks/store.ts';

type UserNavigationProps = {
  authorizationStatus: AuthorizationStatus;
}

function UserNavigation({authorizationStatus}: UserNavigationProps) {
  const offers = useAppSelector((state) => state.offers.offers);
  const favoriteCardCount = offers.filter((offer) => offer.isFavorite).length;
  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={'/favorites'} >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              <span className="header__favorite-count">{favoriteCardCount}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to={'/'}>
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