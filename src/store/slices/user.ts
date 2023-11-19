import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { User } from '../../types/user';
import { fetchUserData } from '../api-actions';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
  redirectToRoute: AppRoute;
  isUserDataLoading: boolean;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: null,
  redirectToRoute: AppRoute.Root,
  isUserDataLoading: false,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    addUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    redirectToRoute: (state, action: PayloadAction<AppRoute>) => {
      state.redirectToRoute = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isUserDataLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserDataLoading = false;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isUserDataLoading = false;
      });
  }
});

export const { setAuthorizationStatus, addUserData, redirectToRoute } = userSlice.actions;
