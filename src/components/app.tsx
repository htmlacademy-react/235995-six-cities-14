import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// pages
import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { OfferPage } from '../pages/offer/offer';
import { FavoritesPage } from '../pages/favorites/favorites';
import { NotFoundPage } from '../pages/error/error-page';
// components
import { PrivateRoute, AuthorizationStatus } from './private-route/private-route';
import { RedirectToMainPage } from './redirect-to-main-page/redirect-to-main-page';
// Data
import { AppRoute, LOCATIONS } from '../const';
import { REVIEWS } from '../mocks/reviews';
import { OFFERS_API } from '../mocks/offers-api';
import { CardProvider } from '../context/card-provider';

function App(): JSX.Element {
  return (
    <CardProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<MainPage offers={OFFERS_API} authorizationStatus={AuthorizationStatus.Auth} />}
            >
              {LOCATIONS.map((city) => (
                <Route
                  key={city}
                  path= {city}
                  element={<MainPage offers={OFFERS_API} authorizationStatus={AuthorizationStatus.Auth} />}
                >
                </Route>
              ))}

            </Route>
            <Route
              path={AppRoute.Login}
              element={
                <RedirectToMainPage authorizationStatus={AuthorizationStatus.NoAuth}>
                  <LoginPage/>
                </RedirectToMainPage>
              }
            >
            </Route>
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                  <FavoritesPage offers={OFFERS_API} />
                </PrivateRoute>
              }
            >
            </Route>
            <Route
              path={AppRoute.Offer}
            >
              <Route
                path=':id'
                element={<OfferPage offersFull={OFFERS_API} reviews ={REVIEWS} authorizationStatus={AuthorizationStatus.Auth} />}
              />
            </Route>
            <Route
              path={AppRoute.Error}
              element={<NotFoundPage />}
            >
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </CardProvider>
  );
}

export { App, AppRoute };
