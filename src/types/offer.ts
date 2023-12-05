export type TFavoriteOfferState = {
  favoriteId: string;
  status: 0 | 1;
};

type LocationCity = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type OfferApi = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: LocationCity;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  bedrooms: number;
  description: string;
  goods: string[];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  images: string[];
  maxAdults: number;
  location: LocationCity;
}

export type Location = {
  'latitude': number;
  'longitude': number;
  'zoom': number;
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
  location:Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
