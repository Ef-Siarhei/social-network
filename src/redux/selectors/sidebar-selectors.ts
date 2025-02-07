import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

const getFriendsPrimitiveSelector = (state: AppStateType) => {
  return state.sidebar.friends;
};
export const getFriendsSel = createSelector([getFriendsPrimitiveSelector], (friends) => {
  return friends.filter(friend => true);
})

export const getPortionFriendsNumber = (state: AppStateType) => {
  return state.sidebar.portionFriendsNumber;
};

export const getPortionFriendsSize = (state: AppStateType) => {
  return state.sidebar.portionFriendsSize;
};

export const getShowFriends = (state: AppStateType) => {
  return state.sidebar.showFriends;
};
