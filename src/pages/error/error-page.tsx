import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Logo } from '../../components/logo/logo';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { AuthorizationStatus } from '../../const.ts';
import { LOCATIONS } from '../../const';
import { LocationItem } from '../../components/location-item/location-item';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities: Error 404</title>
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

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
            {LOCATIONS.map((localCity) => <LocationItem key={localCity} city={localCity}/>)}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Error 404</b>
                <p className="cities__status-description">We can not seem to find the resource you are looking for.</p>
                <b style={{color: '#4481c3'}}><Link to='/'>Go to main page</Link></b>
              </div>
            </section>
            <div className="cities__right-section" style={{backgroundImage: 'none'}}>
              <img src="../../../public/img/city-404.jpg" alt="Error city"
              style={{display: 'block'}}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { NotFoundPage };
