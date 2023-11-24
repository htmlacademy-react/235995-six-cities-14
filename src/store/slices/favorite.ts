import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../const';
import { fetchFavoriteOffers, postFavoriteOffer } from '../api-actions';
import { OfferApi } from '../../types/offer';

export type FavoriteProps = {
  isFavoriteOffersLoading: LoadingStatus;
  isFavoriteOfferPosting: LoadingStatus;
  favoriteOffers: OfferApi[] | [];
  favoriteOffer: OfferApi | null;
}

const initialState: FavoriteProps = {
  isFavoriteOffersLoading: LoadingStatus.Idle,
  isFavoriteOfferPosting: LoadingStatus.Idle,
  favoriteOffers: [],
  favoriteOffer: null,
};

export const favoriteSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    // fetchFavoriteOffers
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = LoadingStatus.Loading;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action: PayloadAction<OfferApi[] | []>) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = LoadingStatus.Success;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = LoadingStatus.Error;
      })
      // postFavoriteOffer
      .addCase(postFavoriteOffer.pending, (state) => {
        state.isFavoriteOfferPosting = LoadingStatus.Loading;
      })
      .addCase(postFavoriteOffer.fulfilled, (state, action: PayloadAction<OfferApi | null>) => {
        state.favoriteOffer = action.payload;
        state.isFavoriteOfferPosting = LoadingStatus.Success;
      })
      .addCase(postFavoriteOffer.rejected, (state) => {
        state.isFavoriteOfferPosting = LoadingStatus.Error;
      });
  }
});

// export const { setFavoriteOffer } = favoriteSlice.actions;
