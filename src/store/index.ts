import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { createApi } from '../services/api';
import { offersSlice } from './slices/offers';
import { userSlice } from './slices/user';
import { loadOffersSlice } from './slices/load-offers';

const api = createApi();

const reducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.LoadOffers]: loadOffersSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});
