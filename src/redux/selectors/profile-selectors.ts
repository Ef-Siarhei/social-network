import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => state.profilePage.profile;
export const getStatusPrimitiveSelector = (state: AppStateType) => state.profilePage.status;
export const getStatus = createSelector([getStatusPrimitiveSelector], (status) => status);
export const getAuthorizedUserId = (state: AppStateType) => state.auth.id;
export const getIsAuth = (state: AppStateType) => state.auth.isAuth;
export const getProfileUpdateStatusPrimitiveSelector = (state: AppStateType) => state.profilePage.profileUpdateStatus;
export const getProfileUpdateStatus = createSelector([getProfileUpdateStatusPrimitiveSelector], (status) => status)
