import {ResultCodesEnum} from '../../api/api'
import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType} from "../../types/types"
import {BaseThunkType, InferActionsTypes} from "../redux-store"
import {profileAPI} from "../../api/profile-api";

let initialState = {
  profile: null as ProfileType | null,
  posts: [
    {id: 1, message: 'Hi, how are you?', like: 5},
    {id: 2, message: "It's my first post.", like: 20},
  ] as Array<PostType>,
  status: '',
  profileUpdateStatus: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'sn/profile/ADD_POST': {
      const newPost: PostType = {
        id: 3,
        message: action.postText,
        like: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case 'sn/profile/SET_USER_PROFILE': {
      return {...state, profile: action.profile}
    }
    case 'sn/profile/SET_USER_STATUS': {
      return {...state, status: action.status}
    }
    case 'sn/profile/DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      }
    }
    case 'sn/profile/SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }
    }
    case 'sn/profile/PROFILE_UPDATE_SUCCESS': {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    case 'sn/profile/PROFILE_UPDATE_ERROR': {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    case 'sn/profile/PROFILE_UPDATE_EDIT': {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    default:
      return state
  }
}

// ActionsCreator
export const actions = {
  addNewPostActionCreator: (postText: string) => ({
    type: 'sn/profile/ADD_POST',
    postText,
  } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: 'sn/profile/SET_USER_PROFILE',
    profile,
  } as const),
  setUserStatus: (status: string) => ({
    type: 'sn/profile/SET_USER_STATUS',
    status,
  } as const),
  deletePostAC: (postId: number) => ({
    type: 'sn/profile/DELETE_POST',
    postId,
  } as const),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: 'sn/profile/SAVE_PHOTO_SUCCESS',
    photos,
  } as const),
  setProfileUpdateStatus: (status: 'edit' | 'success' | 'error') => {
    if (status === 'edit') return {type: 'sn/profile/PROFILE_UPDATE_EDIT', status} as const
    if (status === 'success') return {type: 'sn/profile/PROFILE_UPDATE_SUCCESS', status} as const
    // if (status === 'error')
    return {type: 'sn/profile/PROFILE_UPDATE_ERROR', status} as const
  }
}

// Санки
export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}
export const getUserStatus = (userId: number | null): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(actions.setUserStatus(data))
}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status)
  if (data.resultCode === ResultCodesEnum.Success) dispatch(actions.setUserStatus(status))
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id
  if (userId !== null) {
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === ResultCodesEnum.Success) {
      await dispatch(getUserProfile(userId))
      await dispatch(actions.setProfileUpdateStatus('success'))
    } else {
      let messageError = data.messages.length > 0 ? data.messages[0] : 'Some Error'
      let socialNetwork = messageError.slice(messageError.indexOf('>') + 1, -1).toLowerCase()
      // socialNetwork => word from message about error
      dispatch(stopSubmit('edit-profile', {'contacts': {[socialNetwork]: messageError}}))
      dispatch(actions.setProfileUpdateStatus('error'))
    }
  }
}
export const setProfileStatusEdit = (status: 'edit' | 'success' | 'error'): ThunkType => async (dispatch) => {
  dispatch(actions.setProfileUpdateStatus(status))
}
export const addPost = (postText: string): ThunkType => async (dispatch) => {
  dispatch(actions.addNewPostActionCreator(postText))
}

export default profileReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
