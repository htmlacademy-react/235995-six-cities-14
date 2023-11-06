import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { CardList } from '../../components/card-list/card-list';
import { LOCATIONS, AuthorizationStatus } from '../../const';
import { LocationItem } from '../../components/location-item/location-item';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { MainEmpty } from '../../components/main-empty/main-empty.tsx';
import { Map } from '../../components/map/map.tsx';
import { useCard } from '../../hooks/use-card.ts';
import { OfferApi } from '../../mocks/offers-api.ts';
import { State } from '../../store/';
import { OffersSorting } from '../../components/offers-sorting/offers-sorting.tsx';
import { offersSlice } from '../../store/slices/offers.ts';

interface MainProps {
  authorizationStatus: AuthorizationStatus;
}

function MainPage ({authorizationStatus}: MainProps): JSX.Element {
  const location = useLocation().pathname.slice(1);
  const dispatch = useDispatch();
  const offers = useSelector((state: State): OfferApi[] => state.offers.offers);
  const city = useSelector((state: State): string => state.offers.city);
  const currentSortType = useSelector((state: State): string => state.offers.sortingType);

  // По умолчанию перенаправляем на оферы города Париж
  const navigate = useNavigate();
  useEffect(() => {
    if(!location) {
      navigate('/Paris');
    }
  }, [city, navigate]);
  const {isActiveCard} = useCard();
  // Получаем массив оферов по заданному городу
  const offersByCity = offers.filter((item) => item.city.name === city);

  const utilsSort: {[key:string]: OfferApi[]} = {
    'Popular': offersByCity,
    'Price: low to high': offersByCity.slice().sort((a, b) => a.price - b.price),
    'Price: high to low': offersByCity.slice().sort((a, b) => b.price - a.price),
    'Top rated first': offersByCity.slice().sort((a, b) => b.rating - a.rating),
  };
  // Получаем массив оферов отсортированных по выбранному типу сортировки
  dispatch(offersSlice.actions.getSortedOffers(utilsSort[currentSortType]));
  // Получаем офер активной карточки города
  const selectedPoint = offersByCity.filter((offer) => (offer.id).toString() === isActiveCard);
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
                <CardList />
              </section>
              <div className="cities__right-section">
                {<Map city={offersByCity[0].city.location} points={offersByCity} selectedPoint={selectedPoint[0]}/>}
              </div>
            </div>
          </div>
          : <MainEmpty />}
      </main>
    </div>
  );
}

export { MainPage };
