import {createSelector} from "reselect";

const getUsersPrimitiveSelector = (state) => {
  return state.usersPage.users;
};
export const getUsers = createSelector([getUsersPrimitiveSelector] ,(users)=>{
  return users.filter(el=>true);
})

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};
export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};
export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};
export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};
export const getFollowingIsProgress = (state) => {
  return state.usersPage.followingIsProgress;
};
