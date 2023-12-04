import { LoadingStatus } from '../../../const';
import { State } from '../../../types/state';

export const getFavoriteOffers = (state: State) => state.favorites.favoriteOffers;
export const getFavoritesCount = (state: State) => state.favorites.favoriteOffers.length;
export const isFavoriteStatus = (state: State): LoadingStatus => state.favorites.isFavoriteOffersLoading;
