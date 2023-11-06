import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
});

export const store = configureStore({reducer});

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;
