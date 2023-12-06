import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, LoadingStatus } from '../../../const';
import { User, Comment, PostComment } from '../../../types/user';
import { fetchComments, logoutAction, postComment, checkAuthAction } from '../../api-actions';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  isPosting: LoadingStatus;
  userData: User | null;
  isCommentsDataLoading: boolean;
  comments: Comment[] | [];
  postComment: null | PostComment;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isPosting: LoadingStatus.Idle,
  userData: null,
  isCommentsDataLoading: false,
  comments: [],
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
  },
  extraReducers(builder) {
    builder
      // fetch User Data
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      // logout
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      // fetchComments
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsDataLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[] | []>) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsDataLoading = false;
      })
      // postComment
      .addCase(postComment.pending, (state) => {
        state.isPosting = LoadingStatus.Loading;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<PostComment | null>) => {
        state.postComment = action.payload;
        state.isPosting = LoadingStatus.Success;
      })
      .addCase(postComment.rejected, (state) => {
        state.isPosting = LoadingStatus.Error;
      });
  }
});

export const { setAuthorizationStatus, addUserData } = userSlice.actions;
