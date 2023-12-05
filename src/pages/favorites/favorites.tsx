import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Logo } from '../../components/logo/logo';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty.tsx';
import { useAppSelector } from '../../hooks/store.ts';
import classNames from 'classnames';
import { getFavoriteOffers } from '../../store/slices/favorites/selectors.ts';
import { FavoritesNotEmpty } from '../../components/favorites-not-empty/favorites-not-empty.tsx';


function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavorites = Boolean(favoriteOffers.length);
  return (
    <div className={classNames('page', {'page--favorites-empty': !isFavorites})}>
      <Helmet>
        <title>{`6 cities: favorites ${isFavorites && 'empty'}`}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserNavigation />
          </div>
        </div>
      </header>
      {isFavorites ? <FavoritesNotEmpty favoriteOffers={favoriteOffers} /> : <FavoritesEmpty/>}
      <footer className="footer container">
        <Link className="footer__logo-link" to={'../'}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };
