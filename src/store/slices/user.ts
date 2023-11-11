import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

export interface OffersProps {
  authorizationStatus: AuthorizationStatus;
}

const initialState: OffersProps = {
  authorizationStatus: AuthorizationStatus.Auth,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  }
});

export const { setAuthorizationStatus } = userSlice.actions;
