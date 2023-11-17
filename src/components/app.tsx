import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// pages
import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { OfferPage } from '../pages/offer/offer';
import { FavoritesPage } from '../pages/favorites/favorites';
import { NotFoundPage } from '../pages/error/error-page';
// components
import { Spinner } from './spinner/spinner';
// Data
import { AppRoute, AuthorizationStatus, LOCATIONS } from '../const';
import { REVIEWS } from '../mocks/reviews';
// Store
import { store } from '../store/';
import { checkAuthAction, fetchOffersAction } from '../store/api-actions';
import { useAppSelector } from '../hooks/store';
// Routes
import { RedirectToMainPage } from './redirect-to-main-page/redirect-to-main-page';
import { PrivateRoute } from './private-route/private-route';
import { HistoryRouter } from './history-route/history-route';
import { browserHistory } from '../browser-history';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const loadingStatus = useAppSelector((state) => state.loadOffers.isOffersDataLoading);
  if (loadingStatus || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}x>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          >
            {LOCATIONS.map((city) => (
              <Route
                key={city}
                path= {city}
                element={<MainPage />}
              >
              </Route>
            ))}
          </Route>
          <Route
            path={AppRoute.Login}
            element={
              <RedirectToMainPage>
                <LoginPage/>
              </RedirectToMainPage>
            }
          >
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          >
          </Route>
          <Route
            path={AppRoute.Offer}
          >
            <Route
              path=':id'
              element={<OfferPage reviews ={REVIEWS} />}
            />
          </Route>
          <Route
            path={AppRoute.Error}
            element={<NotFoundPage />}
          >
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export { App, AppRoute };
