import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OfferApi } from '../../types/offer';
import { DEFAULT_LOCATION, DEFAULT_TYPE_SORTING, NameSpace, LoadingStatus } from '../../const';
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
  isOffersDataLoading: LoadingStatus;
  isOfferDataLoading: LoadingStatus;
  isOffersNearbyDataLoading: LoadingStatus;
  currentFavoriteOffer: OfferApi | null;
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
  isOffersDataLoading: LoadingStatus.Idle,
  isOfferDataLoading: LoadingStatus.Idle,
  isOffersNearbyDataLoading: LoadingStatus.Idle,
  currentFavoriteOffer: null,
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
    setFavoriteOffer(state, action: PayloadAction<OfferApi | null>) {
      state.currentFavoriteOffer = action.payload;

      if (action.payload !== null) {
        const currentOfferId = action.payload.id;
        const currentOfferIndex = state.offers.findIndex(
          (offer) => offer.id === currentOfferId
        );
        state.offers[currentOfferIndex].isFavorite = action.payload.isFavorite;
      }

    },
  },
  extraReducers(builder) {
    builder
    // offers
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = LoadingStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = LoadingStatus.Error;
      })
      // offer
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<OfferApi>) => {
        state.offer = action.payload;
        state.isOfferDataLoading = LoadingStatus.Success;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = LoadingStatus.Error;
      })
      // OffersNearby
      .addCase(fetchOffersNearby.pending, (state) => {
        state.isOffersNearbyDataLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action: PayloadAction<OfferApi[]>) => {
        state.offersNearby = action.payload;
        state.isOffersNearbyDataLoading = LoadingStatus.Success;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.isOffersNearbyDataLoading = LoadingStatus.Error;
      });
  }
});

export const { setCity, sortType, getSortedOffers, getActiveOffer, getLoadOffer, getOffersNearby, setFavoriteOffer } = offersSlice.actions;
