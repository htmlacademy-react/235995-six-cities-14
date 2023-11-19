import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OfferApi } from '../../types/offer';
import { DEFAULT_LOCATION, DEFAULT_TYPE_SORTING, NameSpace } from '../../const';
import { fetchOfferAction, fetchOffersAction, fetchOffersNearby } from '../api-actions';

export interface OffersProps {
  offers: OfferApi[];
  offer: OfferApi | null;
  city: string;
  sortingType: string;
  sortedOffers: OfferApi[] | [];
  activeOffer: OfferApi | undefined;
  loadOffer: OfferApi | null;
  offersNearby: OfferApi[] | null;
  isOffersDataLoading: boolean;
  hasError: boolean;
  isOfferDataLoading: boolean;
  isOffersNearbyDataLoading: boolean;
}

const initialState: OffersProps = {
  offers: [],
  offer: null,
  city: DEFAULT_LOCATION,
  sortingType: DEFAULT_TYPE_SORTING,
  sortedOffers: [],
  activeOffer: undefined,
  loadOffer: null,
  offersNearby: null,
  isOffersDataLoading: false,
  hasError: false,
  isOfferDataLoading: false,
  isOffersNearbyDataLoading: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    getSortedOffers: (state, action: PayloadAction<OfferApi[]>) => {
      state.sortedOffers = action.payload;
    },
    getOffersNearby: (state, action: PayloadAction<OfferApi[] | null>) => {
      state.offersNearby = action.payload;
    },
    getLoadOffer: (state, action: PayloadAction<OfferApi | null>) => {
      state.loadOffer = action.payload;
    },
    getActiveOffer: (state, action: PayloadAction<OfferApi | undefined>) => {
      state.activeOffer = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    sortType: (state, action: PayloadAction<string>) => {
      state.sortingType = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    // offers
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
      })
      // offer
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<OfferApi>) => {
        state.offer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.hasError = true;
      })
      // OffersNearby
      .addCase(fetchOffersNearby.pending, (state) => {
        state.isOffersNearbyDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action: PayloadAction<OfferApi[]>) => {
        state.offersNearby = action.payload;
        state.isOffersNearbyDataLoading = false;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.isOffersNearbyDataLoading = false;
        state.hasError = true;
      });
  }
});

export const { setCity, sortType, getSortedOffers, getActiveOffer, getLoadOffer, getOffersNearby } = offersSlice.actions;
