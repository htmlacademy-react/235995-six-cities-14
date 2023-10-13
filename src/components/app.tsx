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

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
}

const OFFER: Offer = {
  'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 130,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': true,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 3,
  'goods': [
    'Heating'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'https://url-to-image/image.png',
    'isPro': false
  },
  'images': [
    'https://url-to-image/image.png'
  ],
  'maxAdults': 4
};

enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/',
  Favorites = '/favorites',
  Error= '*'
}

function App(): JSX.Element {
  const CARDS_AMOUNT: number = 5;
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage cardsAmount={CARDS_AMOUNT} offer={OFFER} />}
          >
          </Route>
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          >
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <FavoritesPage />
              </PrivateRoute>
            }
          >
          </Route>
          <Route
            path={AppRoute.Offer}
          >
            <Route
              index
              element={<OfferPage />}
            />
            <Route
              path=':id'
              element={<OfferPage />}
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
