import { Icon } from 'leaflet';

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
export const RATING_NUMBERS = [5, 4, 3, 2, 1];
export const FAVORITE_BUTTON_DATA = {
  offer: {
    widthBtn: '31',
    heightBtn: '33',
    bemBlock: 'offer',
  },
  main: {
    widthBtn: '18',
    heightBtn: '19',
    bemBlock: 'place-card',
  }
};

export   const Rating = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export const OFFER_CLASSES = {
  MainPage:  'cities',
  FavoritesPage: 'favorites',
  offerPage:  'near-places',
};

export const OFFER_IMAGE_PROPERTY = {
  'favorites': {
    width: '150',
    height: '110',
  },
  'main': {
    width: '260',
    height: '200',
  },
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

export const enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const enum NameSpace {
  Offers = 'offers',
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
