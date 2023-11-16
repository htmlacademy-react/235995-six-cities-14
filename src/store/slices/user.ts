import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: '',
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
    }
  }
});

export const { setAuthorizationStatus, setUserEmail } = userSlice.actions;
