import { OfferApi } from '../../../types/offer';
import { State } from '../../../types/state';
import { LoadingStatus } from '../../../const';

export const getOffers = (state: State): OfferApi[] => state.offers.offers;
export const getCity = (state: State): string => state.offers.city;
export const getOffer = (state: State): OfferApi | [] => state.offers.offer;
export const getSortingType = (state: State): string => state.offers.sortingType;
export const getOffersNearby = (state: State) => state.offers.offersNearby; // : OfferApi[] | []
export const isOfferLoading = (state: State): LoadingStatus => state.offers.isOfferDataLoading;
export const isOffersLoading = (state: State): LoadingStatus => state.offers.isOffersDataLoading;
export const isOffersNearbyLoading = (state: State): LoadingStatus => state.offers.isOffersNearbyDataLoading;
export const getActiveOffer = (state: State): OfferApi | [] => state.offers.activeOffer;
