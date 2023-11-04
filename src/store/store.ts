import { configureStore } from '@reduxjs/toolkit';
import { reducerSetCity } from './reducer';

export const store = configureStore({
  reducer: {
    reducerSetCity,
  },
});
