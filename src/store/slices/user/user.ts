import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, NameSpace, LoadingStatus } from '../../../const';
import { User, Comment, PostComment } from '../../../types/user';
import { fetchComments, fetchUserData, loginAction, logoutAction, postComment } from '../../api-actions';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  isLoging: LoadingStatus;
  isLogout: LoadingStatus;
  userData: User | null;
  redirectToRoute: AppRoute;
  isUserDataLoading: boolean;
  isCommentsDataLoading: boolean;
  isCommentDataPosting: boolean;
  comments: Comment[] | [];
  hasLoadCommentsError: boolean;
  hasSendCommentsError: boolean;
  postComment: null | PostComment;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  isLoging: LoadingStatus.Idle,
  isLogout: LoadingStatus.Idle,
  userData: null,
  redirectToRoute: AppRoute.Root,
  isUserDataLoading: false,
  isCommentsDataLoading: false,
  isCommentDataPosting: false,
  comments: [],
  hasLoadCommentsError: false,
  hasSendCommentsError: false,
  postComment: null,
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
      // fetch User Data
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
      // Login
      .addCase(loginAction.pending, (state) => {
        state.isLoging = LoadingStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoging = LoadingStatus.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoging = LoadingStatus.Error;
      })
      // logout
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      // fetchComments
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsDataLoading = true;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[] | []>) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = true;
      })
      // postComment
      .addCase(postComment.pending, (state) => {
        state.isCommentDataPosting = true;
        state.hasSendCommentsError = false;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<PostComment | null>) => {
        state.postComment = action.payload;
        state.isCommentDataPosting = false;
        state.hasSendCommentsError = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isCommentDataPosting = false;
        state.hasSendCommentsError = true;
      });
  }
});

export const { setAuthorizationStatus, addUserData, redirectToRoute } = userSlice.actions;
