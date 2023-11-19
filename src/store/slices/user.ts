import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { User, Comment } from '../../types/user';
import { fetchComments, fetchUserData } from '../api-actions';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
  redirectToRoute: AppRoute;
  isUserDataLoading: boolean;
  isCommentsDataLoading: boolean;
  comments: Comment[] | null;
  hasLoadCommentsError: boolean;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: null,
  redirectToRoute: AppRoute.Root,
  isUserDataLoading: false,
  isCommentsDataLoading: false,
  comments: null,
  hasLoadCommentsError: false,
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
      })
      // Comments
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsDataLoading = true;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[] | null>) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = true;
      });
  }
});

export const { setAuthorizationStatus, addUserData, redirectToRoute } = userSlice.actions;
