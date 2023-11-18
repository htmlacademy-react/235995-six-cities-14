import { store } from './store';
import { clearError } from './store/api-actions';
import { loadErrorSlice } from './store/slices/load-error';

export const getOfferType = (offerType: string = ''): string => offerType[0].toUpperCase() + offerType.slice(1);

export const getRating = (rating = 0) => Math.round(rating) * 100 / 5;

export const handleProcessError = (message: string): void => {
  store.dispatch(loadErrorSlice.actions.loadError(message));
  store.dispatch(clearError());
};
