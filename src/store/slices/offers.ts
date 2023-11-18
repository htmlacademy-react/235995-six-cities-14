import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OfferApi } from '../../types/offer';
import { DEFAULT_LOCATION, DEFAULT_TYPE_SORTING, NameSpace } from '../../const';

export interface OffersProps {
  offers: OfferApi[];
  city: string;
  sortingType: string;
  sortedOffers: OfferApi[] | [];
  activeOffer: OfferApi | undefined;
  loadOffer: OfferApi | null;
  offersNearby: OfferApi[] | null;
}

const initialState: OffersProps = {
  offers: [],
  city: DEFAULT_LOCATION,
  sortingType: DEFAULT_TYPE_SORTING,
  sortedOffers: [],
  activeOffer: undefined,
  loadOffer: null,
  offersNearby: null,
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
  }
});

export const { setCity, sortType, getSortedOffers, getActiveOffer, getLoadOffer, getOffersNearby } = offersSlice.actions;
