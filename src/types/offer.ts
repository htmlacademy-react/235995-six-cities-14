export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  image: string;
}

export interface IOfferFull extends Offer {
  'bedrooms': number;
  'description': string;
  'goods': string[];
  'host': {
    'avatarUrl': string;
    'id': number;
    'isPro': boolean;
    'name': string;
    };
    'images': string[];
    'maxAdults': number;
}
