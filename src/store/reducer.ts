import { createReducer } from '@reduxjs/toolkit';
import { Action } from './action';
import { OfferApi, OFFERS_API } from '../mocks/offers-api';
import { DEFAULT_LOCATION } from '../const';

type initialStateProps = {
  city: string;
  offerList: OfferApi[];
}

const initialState: initialStateProps = {
  city: DEFAULT_LOCATION,
  offerList: OFFERS_API,
};

const reducerSetCity = createReducer(initialState , (builder) => {
  builder
  .addCase(Action.SET_CURRENT_CITY, (state, action) => {
    state.city = action.payload;
  });
});

export { reducerSetCity };
