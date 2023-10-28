import { Offer, IOfferFull } from '../types/offer';

const OFFERS: Offer[] = [
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'id': 'offer-001',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 125,
    'isFavorite': true,
    'isPremium': true,
    'rating': 2.2,
    'image': 'img/apartment-02.jpg',
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16,
    },
  },
  {
    'id': 'offer-002',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'title': 'Wood and stone place',
    'type': 'room',
    'price': 179,
    'isFavorite': true,
    'isPremium': false,
    'rating': 3,
    'image': 'img/room.jpg',
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16,
    },
  },
  {
    'id': 'offer-003',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'title': 'Canal View Prinsengracht',
    'type': 'apartment',
    'price': 209,
    'isFavorite': false,
    'isPremium': false,
    'rating': 3.4,
    'image': 'img/apartment-02.jpg',
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16,
    },
  },
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      },
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'id': 'offer-004',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'apartment',
    'price': 233,
    'isFavorite': true,
    'isPremium': true,
    'rating': 4.4,
    'image': 'img/apartment-03.jpg',
  },
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      },
    },
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 13
    },
    'id': 'offer-005',
    'title': 'White castle',
    'type': 'apartment',
    'price': 483,
    'isFavorite': true,
    'isPremium': false,
    'rating': 5,
    'image': 'img/apartment-small-04.jpg',
  },
];

const OFFERS_FULL: IOfferFull[] = [
  {
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 13
    },
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'id': 'offer-001',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 125,
    'isFavorite': true,
    'isPremium': true,
    'rating': 2.2,
    'image': 'img/apartment-02.jpg',
    'bedrooms': 3,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
      'Wi-Fi',
      'Washing machine',
      'Cabel TV',
      'Towels'
    ],
    'host': {
      'avatarUrl': 'https://i.pravatar.cc/253',
      'id': 3,
      'isPro': true,
      'name': 'Angelina'
    },
    'images': [
      'img/apartment-small-04.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/apartment-small-03.jpg',
      'img/room-small.jpg',
    ],
    'maxAdults': 4,
  },
  {
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    },
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'id': 'offer-002',
    'title': 'Wood and stone place',
    'type': 'room',
    'price': 179,
    'isFavorite': true,
    'isPremium': false,
    'rating': 3,
    'image': 'img/room.jpg',
    'bedrooms': 4,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Paris.',
    'goods': [
      'Heating',
      'Wi-Fi',
      'Kitchen',
      'Washing machine',
      'Coffee machine',
      'Cabel TV',
      'Towels',
      'Fridge'
    ],
    'host': {
      'avatarUrl': 'https://i.pravatar.cc/159',
      'id': 4,
      'isPro': true,
      'name': 'Yana'
    },
    'images': [
      'img/apartment-small-04.jpg',
      'img/room-small.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/studio-01.jpg',
      'img/apartment-small-03.jpg',
    ],
    'maxAdults': 3,
  },
  {
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 13
    },
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'id': 'offer-003',
    'title': 'Canal View Prinsengracht',
    'type': 'apartment',
    'price': 209,
    'isFavorite': false,
    'isPremium': false,
    'rating': 3.4,
    'image': 'img/apartment-02.jpg',
    'bedrooms': 2,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
      'Wi-Fi',
      'Coffee machine',
      'Cabel TV',
      'Towels',
      'Fridge'
    ],
    'host': {
      'avatarUrl': 'https://i.pravatar.cc/139',
      'id': 5,
      'isPro': false,
      'name': 'Alex'
    },
    'images': [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-small-04.jpg',
      'img/apartment-small-03.jpg',
      'img/studio-01.jpg',
    ],
    'maxAdults': 2,
  },
  {
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 13
    },
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'id': 'offer-004',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'apartment',
    'price': 233,
    'isFavorite': true,
    'isPremium': true,
    'rating': 4.4,
    'image': 'img/apartment-03.jpg',
    'bedrooms': 3,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
      'Wi-Fi',
      'Kitchen',
      'Washing machine',
      'Coffee machine',
      'Towels',
      'Fridge',
      'Baby seat',
      'Dishwasher'
    ],
    'host': {
      'avatarUrl': 'https://i.pravatar.cc/311',
      'id': 6,
      'isPro': false,
      'name': 'John'
    },
    'images': [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-small-03.jpg',
      'img/studio-01.jpg',
      'img/room-small.jpg',
    ],
    'maxAdults': 3,
  },
  {
    'location': {
      'latitude': 50.954361,
      'longitude': 6.982974,
      'zoom': 16
    },
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 50.954361,
      'longitude': 6.982974,
        'zoom': 13
      }
    },
    'id': 'offer-005',
    'title': 'White castle',
    'type': 'apartment',
    'price': 483,
    'isFavorite': true,
    'isPremium': false,
    'rating': 5,
    'image': 'img/apartment-small-04.jpg',
    'bedrooms': 5,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Cologne.',
    'goods': [
      'Heating',
      'Wi-Fi',
      'Kitchen',
      'Washing machine',
      'Coffee machine',
      'Towels',
      'Fridge',
      'Baby seat',
      'Dishwasher'
    ],
    'host': {
      'avatarUrl': 'https://i.pravatar.cc/517',
      'id': 7,
      'isPro': true,
      'name': 'Anna'
    },
    'images': [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-small-03.jpg',
      'img/apartment-small-04.jpg',
      'img/room-small.jpg',
      'img/apartment-03.jpg',
    ],
    'maxAdults': 7,
  },
];

export { OFFERS, OFFERS_FULL };
