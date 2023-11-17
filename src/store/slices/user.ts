import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
  redirectToRoute: AppRoute;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: '',
  redirectToRoute: AppRoute.Root,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    redirectToRoute: (state, action: PayloadAction<AppRoute>) => {
      state.redirectToRoute = action.payload;
    }
  }
});

export const { setAuthorizationStatus, setUserEmail, redirectToRoute } = userSlice.actions;
