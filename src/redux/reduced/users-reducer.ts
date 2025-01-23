import {usersAPI} from '../../api/api';
import {updateObjectInArray} from '../../utils/object-helper';
import {UserType} from "../../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  currentPage: 1,
  totalUsersCount: 0,
  isFetching: false,
  followingIsProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

// type ActionType = {
//   type: string
//   userId?: number
//   users?: []
//   currentPage?: number
//   totalUsersCount?: number
//   isFetching?: boolean
//   followingIsProgress?: boolean
// }

const usersReducer = (state = initialState, action: any): InitialStateType => {
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
      return {...state, users: action.users};
    }
    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage};
    }
    case SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.totalUsersCount};
    }
    case IS_FETCHING: {
      return {...state, isFetching: action.isFetching};
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
type FollowACType = {
  type: typeof FOLLOW
  userId: number
}
export const followAC = (userId: number): FollowACType => ({type: FOLLOW, userId});
type UnFollowACType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unFollowAC = (userId: number): UnFollowACType => ({type: UNFOLLOW, userId});
type SetUsersType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});
type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
type SetIsFetchingType = {
  type: typeof IS_FETCHING
  isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingType => ({
  type: IS_FETCHING,
  isFetching,
});
type ToggleFollowingProgressType = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS
  followingIsProgress: boolean
  userId: number
}
export const toggleFollowingProgress = (followingIsProgress: boolean, userId: number): ToggleFollowingProgressType => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  followingIsProgress,
  userId,
});

// ThunkCreator
export const requestUsers = (currentPage: number, pageSize: number) => {
  // Thunk
  return async (dispatch: Function) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(setIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followUnFollowFlow = async (
  dispatch: Function,
  userId: number,
  apiMethod: Function,
  actionCreator: Function,
) => {
  dispatch(toggleFollowingProgress(true, userId));

  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => {
  return async (dispatch: Function) => {
    followUnFollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followAC,
    );
  };
};

export const unFollow = (userId: number) => {
  return async (dispatch: Function) => {
    followUnFollowFlow(
      dispatch,
      userId,
      usersAPI.unFollow.bind(usersAPI),
      unFollowAC,
    );
  };
};

export default usersReducer;
