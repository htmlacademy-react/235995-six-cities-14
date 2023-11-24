import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const';
import { AppDispatch } from '../types/state';
import { OfferApi } from '../types/offer';
import { State } from '../types/state';
import { userSlice } from './slices/user';
import { saveToken, dropToken } from '../services/token';
import { AuthData, User, Comment, PostComment } from '../types/user';
import { FavoriteData } from '../types/favorite';

type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
// Offers
export const fetchOffersAction = createAsyncThunk<OfferApi[], undefined, Extra>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferApi[]>(APIRoute.Offers);

    return data;
  },
);
// Offer
export const fetchOfferAction = createAsyncThunk<OfferApi, string | undefined, Extra>(
  'data/fetchOffer',
  async (id, { extra: api}) => {
    const {data} = await api.get<OfferApi>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchOffersNearby = createAsyncThunk<OfferApi[], string | undefined, Extra>(
  'data/fetchOffersNearby',
  async (id, { extra: api}) => {
    const {data} = await api.get<OfferApi[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);

    return data;
  },
);
// isFavorite
export const fetchFavoriteOffers = createAsyncThunk<OfferApi[], undefined, Extra>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<OfferApi[] | []>(APIRoute.Favorite);

    return data;
  },
);

export const postFavoriteOffer = createAsyncThunk<OfferApi, FavoriteData, Extra>(
  'user/postFavoriteOffer',
  async ({ favoriteId, status }, {extra: api}) => {
    const {data} = await api.post<OfferApi>(`${APIRoute.Favorite}/${favoriteId}/${status}`);

    return data;
  },
);

// Comments
export const fetchComments = createAsyncThunk<Comment[], string | undefined, Extra>(
  'user/fetchComments',
  async (id, { extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

    return data;
  },
);

export const postComment = createAsyncThunk<PostComment, PostComment, Extra>(
  'user/postComment',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<PostComment>(`${APIRoute.Comments}/${id}`, {comment, rating});

    return data;
  },
);
// user Data
export const fetchUserData = createAsyncThunk<User, undefined, Extra>(
  'data/fetchUserData',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<User>(APIRoute.Login);

    return data;
  },
);
// Auth
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
    const {data: {token}, data} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(userSlice.actions.setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(userSlice.actions.addUserData(data));
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
