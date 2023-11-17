import { Icon } from 'leaflet';

export const TIMEOUT_SHOW_ERROR = 3000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const REQUEST_TIMEOUT = 5000;
export const BASE_URL = 'https://14.design.pages.academy/six-cities';
export const DEFAULT_TYPE_SORTING = 'Popular';
export const DEFAULT_LOCATION = 'Paris';
export const MAX_IMAGES_COUNT = 6;
export const MAX_REVIEW_COUNT = 10;
export const MAX_NEAR_PLACES_OFFER_COUNT = 3;
export const URL_MARKER_DEFAULT = './markup/img/pin.svg';
export const URL_MARKER_CURRENT = './markup/img/pin-active.svg';
export const OFFER_CLASSES = {
  MainPage:  'cities',
  FavoritesPage: 'favorites',
  offerPage:  'near-places',
};

export const DEFAULT_CUSTOM_ICON = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

export const LOCATIONS: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const SORT_TYPES: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const CURRENT_CUSTOM_ICON = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

export const enum NameSpace {
  Offers = 'offers',
  LoadOffers ='loadOffers',
  loadError = 'loadError',
  User = 'user',
  Favorites = 'favorites',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
// ручки
export const enum APIRoute {
  Offers = '/offers',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/',
  Favorites = '/favorites',
  Error= '*',
}

export const enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}
