import { State } from '../../../types/state';
import { LoadingStatus, MAX_NEAR_PLACES_OFFER_COUNT } from '../../../const';
import { createSelector } from '@reduxjs/toolkit';

export const getOffers = (state: State) => state.offers.offers;
export const getCity = (state: State) => state.offers.city;
export const getOffer = (state: State) => state.offers.offer;
export const getSortingType = (state: State) => state.offers.sortingType;
export const getOffersNearby = (state: State) => state.offers.offersNearby;
export const isOfferLoading = (state: State): LoadingStatus => state.offers.isOfferDataLoading;
export const isOffersLoading = (state: State): LoadingStatus => state.offers.isOffersDataLoading;
export const isOffersNearbyLoading = (state: State): LoadingStatus => state.offers.isOffersNearbyDataLoading;
export const selectActiveOffer = (state: State) => state.offers.activeOffer;

export const selectNearby = createSelector(getOffersNearby, (offersNearby) => offersNearby.slice(0, MAX_NEAR_PLACES_OFFER_COUNT));
