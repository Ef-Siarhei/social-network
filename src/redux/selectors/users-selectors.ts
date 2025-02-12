import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

const getUsersPrimitiveSelector = (state: AppStateType) => {
  return state.usersPage.users;
};
export const getUsers = createSelector([getUsersPrimitiveSelector], (users) => {
  return users.filter(user => true);
})
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingIsProgress = (state: AppStateType) => {
  return state.usersPage.followingIsProgress;
};
export const getUsersFilter = (state: AppStateType) => state.usersPage.filter
