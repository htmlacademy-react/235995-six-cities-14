import { State } from '../../../types/state';

export const getUserAuthStatus = (state: State) => state.user.authorizationStatus;
export const getUserData = (state: State) => state.user.userData;
export const isUserDataLoading = (state: State) => state.user.isUserDataLoading;
export const getComments = (state: State) => state.user.comments;
export const isCommentsLoading = (state: State) => state.user.isCommentsDataLoading;
