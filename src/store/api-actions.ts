import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { AppDispatch } from '../types/state';
import { OfferApi } from '../types/offer';
import { State } from '../types/state';
import { offersSlice } from './slices/offers';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferApi[]>(APIRoute.Offers);

    dispatch(offersSlice.actions.getOffers(data));
  },
);
