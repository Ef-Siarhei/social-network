import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => state.profilePage.profile;
export const getStatus = (state: AppStateType) => state.profilePage.status;
export const getAuthorizedUserId = (state: AppStateType) => state.auth.id;
export const getProfileUpdateStatus = (state: AppStateType) => state.profilePage.profileUpdateStatus;
export const getPosts = (state: AppStateType) => state.profilePage.posts
