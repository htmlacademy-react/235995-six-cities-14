import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OfferApi, OFFERS_API } from '../../mocks/offers-api';
import { DEFAULT_LOCATION } from '../../const';

export interface OffersProps {
  offers: OfferApi[];
  city: string;
}

const initialState: OffersProps = {
  offers: OFFERS_API,
  city: DEFAULT_LOCATION,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    getOffers: (state, action: PayloadAction<OfferApi[]>) => {
      state.offers = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  }
});

export const { getOffers, setCity } = offersSlice.actions;
