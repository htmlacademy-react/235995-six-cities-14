import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OfferApi, TFavoriteOfferState } from '../../../types/offer';
import { DEFAULT_LOCATION, DEFAULT_TYPE_SORTING, NameSpace, LoadingStatus } from '../../../const';
import { fetchOfferAction, fetchOffersAction, fetchOffersNearby } from '../../api-actions';

export interface OffersProps {
  offers: OfferApi[];
  offer: OfferApi | null;
  city: string;
  sortingType: string;
  activeOffer: OfferApi | null;
  offersNearby: OfferApi[] | [];
  isOffersDataLoading: LoadingStatus;
  isOfferDataLoading: LoadingStatus;
  isOffersNearbyDataLoading: LoadingStatus;
}

const initialState: OffersProps = {
  offers: [],
  offer: null,
  city: DEFAULT_LOCATION,
  sortingType: DEFAULT_TYPE_SORTING,
  activeOffer: null,
  offersNearby: [],
  isOffersDataLoading: LoadingStatus.Idle,
  isOfferDataLoading: LoadingStatus.Idle,
  isOffersNearbyDataLoading: LoadingStatus.Idle,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffersNearby: (state, action: PayloadAction<OfferApi[] | []>) => {
      state.offersNearby = action.payload;
    },
    setActiveOffer: (state, action: PayloadAction<OfferApi | null>) => {
      state.activeOffer = action.payload;
    },
    dropOffer: (state) => {
      state.offer = null;
      state.isOfferDataLoading = LoadingStatus.Idle;
      state.isOffersNearbyDataLoading = LoadingStatus.Idle;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    sortType: (state, action: PayloadAction<string>) => {
      state.sortingType = action.payload;
    },
    setFavoriteOffer(state, action: PayloadAction<TFavoriteOfferState>) {
      if (action.payload.favoriteId !== '') {
        const {favoriteId , status} = action.payload;
        const currentOffer = state.offers.find((offer) => offer.id === favoriteId);
        if (currentOffer) {
          currentOffer.isFavorite = Boolean(status);
        }
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

export const { setCity, sortType, getSortedOffers, setActiveOffer, setOffersNearby, setFavoriteOffer, dropOffer } = offersSlice.actions;
