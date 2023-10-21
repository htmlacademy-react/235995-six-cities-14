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
import { AppRoute } from '../const';
import { OFFERS, OFFERS_FULL } from '../mocks/offers';
import { REVIEWS } from '../mocks/reviews';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage offers={OFFERS} authorizationStatus={AuthorizationStatus.Auth} />}
          >
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
                <FavoritesPage offers={OFFERS} />
              </PrivateRoute>
            }
          >
          </Route>
          <Route
            path={AppRoute.Offer}
          >
            <Route
              path=':id'
              element={<OfferPage offersFull={OFFERS_FULL} reviews ={REVIEWS} authorizationStatus={AuthorizationStatus.Auth} />}
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
  );
}

export { App, AppRoute };
