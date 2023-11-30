import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { logoutAction } from "../../store/api-actions";
import { AppRoute } from "../../const";


function UserLogin() {
  const dispatch = useAppDispatch();
  const favoriteCardCount = useAppSelector((state) => state.favorites.favoriteOffers).length;
  const userData = useAppSelector((state) => state.user.userData);
  const handleLogout = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} >
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
    </nav>
  );
}

export { UserLogin };
