export type AuthData = {
  login: string;
  password: string;
}

export type UserData = {
  id: number;
  email: string;
  token: string;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
}
// review type
export type UserReview = {
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
    'user': UserReview;
}
