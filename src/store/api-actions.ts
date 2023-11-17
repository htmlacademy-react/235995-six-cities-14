import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AppDispatch } from '../types/state';
import { OfferApi } from '../types/offer';
import { State } from '../types/state';
import { userSlice } from './slices/user';
import { saveToken, dropToken } from '../services/token';
import { AuthData, UserData } from '../types/user';
import { store } from '.';
import { loadErrorSlice } from './slices/load-error';

type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<OfferApi[], undefined, Extra>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferApi[]>(APIRoute.Offers);

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, Extra>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(userSlice.actions.setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(userSlice.actions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, Extra>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(userSlice.actions.setAuthorizationStatus(AuthorizationStatus.Auth));
    // dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(userSlice.actions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

export const clearError = createAsyncThunk(
  'user/clearError',
  () => {
    setTimeout(
      () => store.dispatch(loadErrorSlice.actions.loadError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);
