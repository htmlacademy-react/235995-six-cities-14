import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { CardList } from '../../components/card-list/card-list';
import { LOCATIONS } from '../../const';
import { LocationItem } from '../../components/location-item/location-item';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { AuthorizationStatus } from '../../const.ts';
import { MainEmpty } from '../../components/main-empty/main-empty.tsx';
import { Map } from '../../components/map/map.tsx';
import { useCard } from '../../hooks/use-card.ts';
import { OfferApi } from '../../mocks/offers-api.ts';
import { State } from '../../store/';
import classNames from 'classnames';

interface MainProps {
  authorizationStatus: AuthorizationStatus;
}

function MainPage ({authorizationStatus}: MainProps): JSX.Element {
  const offers = useSelector((state: State): OfferApi[] => state.offers.offers);
  const city = useSelector((state: State): string => state.offers.city);

  // По умолчанию перенаправляем на оферы города Париж
  const navigate = useNavigate();
  useEffect(() => {
    if(!city) {
      navigate('/Paris');
    }
  }, [city, navigate]);
  const {isActiveCard} = useCard();
  // Получаем массив оферов по заданному городу
  const offersByCity = offers.filter((item) => item.city.name === city);
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
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
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
