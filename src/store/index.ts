import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { createApi } from '../services/api';
import { offersSlice } from './slices/offers';
import { userSlice } from './slices/user';
// import { loadOffersSlice } from './slices/load-offers';
import { loadErrorSlice } from './slices/load-error';
import { redirect } from './midleware/redirect';

const api = createApi();

export const reducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  // [NameSpace.LoadOffers]: loadOffersSlice.reducer,
  [NameSpace.loadError]: loadErrorSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});
