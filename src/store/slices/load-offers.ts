import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchOffersAction } from '../api-actions';
import { OfferApi } from '../../types/offer';

type LoadOffersProps = {
  offers: [] | OfferApi[];
  isOffersDataLoading: boolean;
  hasError: boolean;
}

const initialState: LoadOffersProps = {
  offers: [],
  isOffersDataLoading: false,
  hasError: false,
};

export const loadOffersSlice = createSlice({
  name: NameSpace.LoadOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      });
  }
});
