import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { userSlice } from './slices/user';
import { createApi } from '../services/api';

const api = createApi();

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
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
