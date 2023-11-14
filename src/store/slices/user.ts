import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.NoAuth,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  }
});

export const { setAuthorizationStatus } = userSlice.actions;
