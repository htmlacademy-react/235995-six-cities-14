import { createAction } from '@reduxjs/toolkit';

export const Action = {
  SET_CURRENT_CITY: 'SET_CURRENT_CITY',
  SET_ACTIVE_CARD: 'SET_ACTIVE_CARD',
  SET_FAVORITE_CARD: 'SET_FAVORITE_CARD',
  SET_SORT_TYPE: 'SET_SORT_TYPE',
  SET_AUTH_TYPE: 'SET_AUTH_TYPE',
};

export const setAuthType = createAction(Action.SET_AUTH_TYPE);

export const setCurrentCity = (cityName: string) => ({
  type: Action.SET_CURRENT_CITY,
  payload: cityName,
});

export const setActiveCard = (offerId: number) => ({
  type: Action.SET_ACTIVE_CARD,
  payload: offerId,
});

export const setFavoriteCard = (offerId: number) => ({
  type: Action.SET_FAVORITE_CARD,
  payload: offerId,
});

export const setSortType = (sortType: string) => ({
  type: Action.SET_SORT_TYPE,
  payload: sortType,
});
