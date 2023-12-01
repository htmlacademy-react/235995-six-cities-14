import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Logo } from '../../components/logo/logo';
import { FavoritesLocation } from '../../components/favorites-location/favorites-location';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts';
import { fetchFavoriteOffers } from '../../store/api-actions.ts';
import { useEffect } from 'react';
import classNames from 'classnames';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);
  const favoriteOffers = useAppSelector((state) => state.favorites.favoriteOffers);
  const isFavorites = Boolean(favoriteOffers.length);
  return (
    <div className={classNames('page', {'page--favorites-empty': isFavorites})}>
      <Helmet>
        <title>6 cities: favorites</title>
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
      {isFavorites ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <FavoritesLocation favoriteOffers={favoriteOffers} />
              </ul>
            </section>
          </div>
        </main>
        :
        <FavoritesEmpty/>}
      <footer className="footer container">
        <Link className="footer__logo-link" to={'../'}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };
