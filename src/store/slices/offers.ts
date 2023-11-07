import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OfferApi, OFFERS_API } from '../../mocks/offers-api';
import { DEFAULT_LOCATION, DEFAULT_TYPE_SORTING } from '../../const';

export interface OffersProps {
  offers: OfferApi[];
  city: string;
  sortingType: string;
  sortedOffers: OfferApi[] | [];
  activeOffer: string;
}

const initialState: OffersProps = {
  offers: OFFERS_API,
  city: DEFAULT_LOCATION,
  sortingType: DEFAULT_TYPE_SORTING,
  sortedOffers: [],
  activeOffer: 'null',
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    getOffers: (state, action: PayloadAction<OfferApi[]>) => {
      state.offers = action.payload;
    },
    getSortedOffers: (state, action: PayloadAction<OfferApi[]>) => {
      state.sortedOffers = action.payload;
    },
    getActiveOffer: (state, action: PayloadAction<string>) => {
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

export const { getOffers, setCity, sortType, getSortedOffers, getActiveOffer } = offersSlice.actions;
