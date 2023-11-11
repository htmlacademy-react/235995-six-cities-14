import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';
import { userSlice } from './slices/user';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export const store = configureStore({reducer});
