import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { createApi } from '../services/api';
import { offersSlice } from './slices/offers/offers';
import { userSlice } from './slices/user/user';
import { favoriteSlice } from './slices/favorites/favorite';

const api = createApi();

export const reducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Favorites]: favoriteSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});
