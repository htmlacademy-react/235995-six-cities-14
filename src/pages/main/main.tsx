import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import { LocationItem } from '../../components/location-item/location-item';
import { UserNavigation } from '../../components/user-navigation/user-navigation';
import { MainEmpty } from '../../components/main-empty/main-empty.tsx';
import { LOCATIONS, DEFAULT_LOCATION, LoadingStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/store.ts';
import { offersSlice } from '../../store/slices/offers/offers.ts';
import { fetchOffersAction } from '../../store/api-actions.ts';
import {MainCities} from '../../components/main-cities/main-cities.tsx';
import { getCity, getOffers, isOffersLoading } from '../../store/slices/offers/selectors.ts';
import { Spinner } from '../../components/spinner/spinner.tsx';

function MainPage (): JSX.Element {
  const dispatch = useAppDispatch();
  const statusOffersLoading = useAppSelector(isOffersLoading);
  useEffect(() => {
    if (statusOffersLoading === LoadingStatus.Idle) {
      dispatch(fetchOffersAction());
    }
  }, [statusOffersLoading, dispatch]);
  const city = useAppSelector(getCity);
  const location = useLocation().pathname.slice(1);
  const offers = useAppSelector(getOffers);
  // По умолчанию перенаправляем на город Париж
  const navigate = useNavigate();

  useEffect(() => {
    // При переходе со страницы логин на случайный город
    if (city !== location && LOCATIONS.includes(location)) {
      dispatch(offersSlice.actions.setCity(location));
    }
    if(!location || !LOCATIONS.includes(location)) {
      dispatch(offersSlice.actions.setCity(location));
      navigate(`/${DEFAULT_LOCATION}`);
    }
  }, [city, navigate, location, dispatch]);
  // Получаем массив оферов по заданному городу
  const offersByCity = offers.filter((item) => item.city.name === city);
  // Получаем кол-во количество оферов по городу
  const isEmpty = offersByCity.length > 0;
  const loadingStatus = useAppSelector(isOffersLoading);
  if (loadingStatus === LoadingStatus.Idle || loadingStatus === LoadingStatus.Loading) {
    return <Spinner />;
  }

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
            <UserNavigation />
          </div>
        </div>
      </header>
      <main className={classNames('page__main', 'page__main--index', { 'page__main--index-empty': !isEmpty })}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {LOCATIONS.map((localCity) => <LocationItem key={localCity} city={localCity}/>)}
            </ul>
          </section>
        </div>
        {isEmpty ? <MainCities /> : <MainEmpty />}
      </main>
    </div>
  );
}

export { MainPage };
