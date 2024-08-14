import { usersAPI } from '../../api/api';
import { updateObjectInArray } from '../../utils/object-helper';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  pageSize: 10,
  currentPage: 1,
  totalUsersCount: 0,
  isFetching: false,
  followingIsProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      };
    }
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingIsProgress: action.followingIsProgress
          ? [...state.followingIsProgress, action.userId]
          : state.followingIsProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

// Action Creator
export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unFollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
export const setIsFetching = (isFetching) => ({
  type: IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (followingIsProgress, userId) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  followingIsProgress,
  userId,
});

// ThunkCreator
export const requestUsers = (currentPage, pageSize) => {
  // Thunk
  return async (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(setIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followUnFollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator,
) => {
  dispatch(toggleFollowingProgress(true, userId));

  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    followUnFollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followAC,
    );
  };
};

export const unFollow = (userId) => {
  return async (dispatch) => {
    followUnFollowFlow(
      dispatch,
      userId,
      usersAPI.unFollow.bind(usersAPI),
      unFollowAC,
    );
  };
};

export default usersReducer;
