import {UserType} from "../../types/types";
import {usersAPI} from "../../api/users-api";
import {BaseThunkType, InferActionsTypes} from "../redux-store";

let initialState = {
  friends: [] as Array<UserType>,
  portionFriendsNumber: 2,
  portionFriendsSize: 20,
  showFriends: true
};

const sidebarReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'sn/sidebar/SET_FRIENDS': {
      return {
        ...state,
        friends: action.friends
      }
    }
    default:
      return state
  }
};

const actions = {
  setFriends: (friends: Array<UserType>) => ({type: 'sn/sidebar/SET_FRIENDS', friends} as const)
}

export const getFriends = (currentPage: number, pageSize: number, term: string, friends: null | boolean): ThunkType => async (dispatch) => {
  let data = await usersAPI.getUsers(currentPage, pageSize, term,  friends)
  dispatch(actions.setFriends(data.items))
}

export default sidebarReducer;

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
