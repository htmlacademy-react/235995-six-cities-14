import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { Logo } from '../../components/logo/logo';
import { FavoritesLocation } from '../../components/favorites-location/favorites-location';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { AuthorizationStatus } from '../../const.ts';

interface FavoritesProps {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserNavigation authorizationStatus={AuthorizationStatus.Auth} />
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesLocation offers={offers} />
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={'../'}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };
