import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { CardList } from '../../components/card-list/card-list';
import { LocationItem } from '../../components/location-item/location-item';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { MainEmpty } from '../../components/main-empty/main-empty.tsx';
import { Map } from '../../components/map/map.tsx';
import { OffersSorting } from '../../components/offers-sorting/offers-sorting.tsx';
import { OfferApi } from '../../mocks/offers-api.ts';
import { LOCATIONS, DEFAULT_LOCATION } from '../../const';
import { useAppSelector } from '../../hooks/store.ts';

function MainPage (): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const offers = useAppSelector((state) => state.offers.offers);
  const city = useAppSelector((state) => state.offers.city);
  const currentSortType = useAppSelector((state) => state.offers.sortingType);
  const location = useLocation().pathname.slice(1);
  // По умолчанию перенаправляем на город Париж
  const navigate = useNavigate();
  useEffect(() => {
    if(!location) {
      navigate(`/${DEFAULT_LOCATION}`);
    }
  }, [city, navigate, location]);

  // Получаем массив оферов по заданному городу
  const offersByCity = offers.filter((item) => item.city.name === city);
  // Функции сортировки предложений
  const utilsSort: {[key:string]: OfferApi[]} = {
    'Popular': offersByCity,
    'Price: low to high': offersByCity.slice().sort((a, b) => a.price - b.price),
    'Price: high to low': offersByCity.slice().sort((a, b) => b.price - a.price),
    'Top rated first': offersByCity.slice().sort((a, b) => b.rating - a.rating),
  };
  const sortedOffers = utilsSort[currentSortType];
  // Получаем кол-во количество оферов по городу
  const amountOffers = offersByCity.length;
  const isEmpty = amountOffers > 0;
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <UserNavigation authorizationStatus={authorizationStatus} />
          </div>
        </div>
      </header>
      <main className={classNames('page__main', 'page__main--index', { 'page__main page__main--index': !isEmpty }) }>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {LOCATIONS.map((localCity) => <LocationItem key={localCity} city={localCity}/>)}
            </ul>
          </section>
        </div>
        { isEmpty ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{amountOffers} {amountOffers > 1 ? 'places' : 'place'} to stay in {city}</b>
                <OffersSorting />
                <CardList sortedOffers={sortedOffers} />
              </section>
              <div className="cities__right-section">
                {<Map city={offersByCity[0].city.location} points={offersByCity} />}
              </div>
            </div>
          </div>
          : <MainEmpty />}
      </main>
    </div>
  );
}

export { MainPage };
