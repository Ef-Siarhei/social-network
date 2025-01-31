import {FollowUnFollowResponseType, ResultCodesEnum, usersAPI} from '../../api/api'
import {updateObjectInArray} from '../../utils/object-helper'
import {UserType} from "../../types/types"
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "../redux-store"
import {Dispatch} from "redux"

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  currentPage: 1,
  totalUsersCount: 0,
  isFetching: false,
  followingIsProgress: [] as Array<number>
}
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }
    }
    case 'UNFOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }
    }
    case 'SET_USERS': {
      return {...state, users: action.users}
    }
    case 'SET_CURRENT_PAGE': {
      return {...state, currentPage: action.currentPage}
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return {...state, totalUsersCount: action.totalUsersCount}
    }
    case 'IS_FETCHING': {
      return {...state, isFetching: action.isFetching}
    }
    case 'TOGGLE_FOLLOWING_PROGRESS': {
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

type ActionTypes = InferActionsTypes<typeof actions>

// Object Actions Creators
const actions = {
  followAC: (userId: number) => (<const>{type: 'FOLLOW', userId}),
  unFollowAC: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage,
  } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount,
  } as const),
  setIsFetching: (isFetching: boolean) => ({
    type: 'IS_FETCHING',
    isFetching,
  } as const),
  toggleFollowingProgress: (followingIsProgress: boolean, userId: number) => ({
    type: 'TOGGLE_FOLLOWING_PROGRESS',
    followingIsProgress,
    userId,
  } as const)
}

type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// ThunkCreator
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
  // ThunkCreator возвращает Thunk
  return async (dispatch, getState) => {
    getState().profilePage.profile?.userId?.toFixed()
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setIsFetching(true))

    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

// _ намекает что функция для внутреннего использования, тоесть никуда не экспортируеться
const _followUnFollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<FollowUnFollowResponseType>,
  actionCreator: (userId: number) => ActionTypes,
) => {
  dispatch(actions.toggleFollowingProgress(true, userId))

  let data = await apiMethod(userId)
  if (data.resultCode === ResultCodesEnum.Sucsess) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnFollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followAC,
    )
  }
}

export const unFollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnFollowFlow(
      dispatch,
      userId,
      usersAPI.unFollow.bind(usersAPI),
      actions.unFollowAC,
    )
  }
}

export default usersReducer
