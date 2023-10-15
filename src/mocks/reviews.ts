type User = {
    'avatarUrl': string;
    'id': number;
    'isPro': boolean;
    'name': string;
}

export interface IReview {
  'comment': string;
    'date': string;
    'id': number;
    'rating': number;
    'user': User;
}

const REVIEWS: IReview[] = [
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    'date': '2022-05-09',
    'id': 1,
    'rating': 4.2,
    'user': {
      'avatarUrl': 'https://i.pravatar.cc/333',
      'id': 1,
      'isPro': true,
      'name': 'Oliver.conner'
    }
  },
  {
    'comment': 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful. The building is green and from 19th century. Nice place!',
    'date': '2023-01-07',
    'id': 2,
    'rating': 4.7,
    'user': {
      'avatarUrl': 'https://i.pravatar.cc/273',
      'id': 2,
      'isPro': true,
      'name': 'James.bond'
    }
  },
  {
    'comment': 'Not enough honey, Too much bees',
    'date': '2023-07-09',
    'id': 3,
    'rating': 2.5,
    'user': {
      'avatarUrl': 'https://i.pravatar.cc/173',
      'id': 3,
      'isPro': false,
      'name': 'Vinee.pooh'
    }
  },
];

export { REVIEWS };
