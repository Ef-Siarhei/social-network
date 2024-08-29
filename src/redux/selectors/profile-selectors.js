import {createSelector} from "reselect";

export const getProfile = (state) => state.profilePage.profile;
export const getStatusPrimitiveSelector = (state) => state.profilePage.status;
export const getStatus = createSelector([getStatusPrimitiveSelector], (status) => status);
export const getAuthorizedUserId = (state) => state.auth.id;
export const getIsAuth = (state) => state.auth.isAuth;
export const getProfileUpdateStatusPrimitiveSelector = (state) => state.profilePage.profileUpdateStatus;
export const getProfileUpdateStatus = createSelector([getProfileUpdateStatusPrimitiveSelector], (status) => status)
