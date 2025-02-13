import {ApiResponseType, ResultCodesEnum} from '../../api/api'
import {updateObjectInArray} from '../../utils/object-helper'
import {UserType} from "../../types/types"
import {BaseThunkType, InferActionsTypes} from "../redux-store"
import {Dispatch} from "redux"
import {usersAPI} from "../../api/users-api";


const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  currentPage: 1,
  totalUsersCount: 0,
  isFetching: false,
  followingIsProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: ''
  }
}

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'sn/users/FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }
    }
    case 'sn/users/UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }
    }
    case 'sn/users/SET_USERS': {
      return {...state, users: action.users}
    }
    case 'sn/users/SET_CURRENT_PAGE': {
      return {...state, currentPage: action.currentPage}
    }
    case 'sn/users/SET_TOTAL_USERS_COUNT': {
      return {...state, totalUsersCount: action.totalUsersCount}
    }
    case 'sn/users/IS_FETCHING': {
      return {...state, isFetching: action.isFetching}
    }
    case 'sn/users/SET_FILTER': {
      return {...state, filter: action.payload}
    }
    case 'sn/users/TOGGLE_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingIsProgress: action.followingIsProgress
          ? [...state.followingIsProgress, action.userId]
          : state.followingIsProgress.filter((id) => id !== action.userId),
      }
    }
    default:
      return state
  }
}

// Object Actions Creators
export const actions = {
  followAC: (userId: number) => ({type: 'sn/users/FOLLOW', userId} as const),
  unFollowAC: (userId: number) => ({type: 'sn/users/UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'sn/users/SET_USERS', users} as const),
  setFilter: (filter: FilterType) => ({type: 'sn/users/SET_FILTER', payload: filter} as const),
  setCurrentPage: (currentPage: number) => ({
    type: 'sn/users/SET_CURRENT_PAGE',
    currentPage,
  } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'sn/users/SET_TOTAL_USERS_COUNT',
    totalUsersCount,
  } as const),
  setIsFetching: (isFetching: boolean) => ({
    type: 'sn/users/IS_FETCHING',
    isFetching,
  } as const),
  toggleFollowingProgress: (followingIsProgress: boolean, userId: number) => ({
    type: 'sn/users/TOGGLE_FOLLOWING_PROGRESS',
    followingIsProgress,
    userId,
  } as const)
}

// ThunkCreator
export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
  // ThunkCreator возвращает Thunk
  return async (dispatch, getState) => {
    getState().profilePage.profile?.userId?.toFixed()
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setIsFetching(true))
    dispatch(actions.setFilter(filter))

    let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

// _ намекает что функция для внутреннего использования, тоесть никуда не экспортируеться
const _followUnFollowFlow = async (
  dispatch: Dispatch<ActionTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<ApiResponseType>,
  actionCreator: (userId: number) => ActionTypes,
) => {
  dispatch(actions.toggleFollowingProgress(true, userId))

  let data = await apiMethod(userId)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
  await _followUnFollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(usersAPI),
    actions.followAC,
  )
}

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
  await _followUnFollowFlow(
    dispatch,
    userId,
    usersAPI.unFollow.bind(usersAPI),
    actions.unFollowAC,
  )
}

export default usersReducer

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>
