import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { User } from '../../types/user';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
  redirectToRoute: AppRoute;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: null,
  redirectToRoute: AppRoute.Root,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    addUserEmail: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    redirectToRoute: (state, action: PayloadAction<AppRoute>) => {
      state.redirectToRoute = action.payload;
    }
  }
});

export const { setAuthorizationStatus, addUserEmail, redirectToRoute } = userSlice.actions;
