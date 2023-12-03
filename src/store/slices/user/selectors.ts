import { AuthorizationStatus } from '../../../const';
import { State } from '../../../types/state';
import { User, Comment } from '../../../types/user';

export const getUserAuthStatus = (state: State): AuthorizationStatus => state.user.authorizationStatus;
export const getUserData = (state: State): User | null => state.user.userData;
export const isUserDataLoading = (state: State): boolean => state.user.isUserDataLoading;
export const getComments = (state: State): Comment[] | [] => state.user.comments;
export const isCommentsLoading = (state: State): boolean => state.user.isCommentsDataLoading;
export const isPostingStatus = (state: State) => state.user.isPosting;
