import {profileAPI, ResultCodesEnum} from '../../api/api'
import {stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType} from "../../types/types"
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "../redux-store"

let initialState = {
  profile: null as ProfileType | null,
  posts: [
    {id: 1, message: 'Hi, how are you?', like: 5},
    {id: 2, message: "It's my first post.", like: 20},
  ] as Array<PostType>,
  status: '',
  profileUpdateStatus: ''
}
type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
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
    case 'SET_USER_PROFILE': {
      return {...state, profile: action.profile}
    }
    case 'SET_USER_STATUS': {
      return {...state, status: action.status}
    }
    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      }
    }
    case 'SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }
    }
    case 'PROFILE_UPDATE_SUCCESS': {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    case 'PROFILE_UPDATE_ERROR': {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    case 'PROFILE_UPDATE_EDIT': {
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
const actions = {
  addNewPostActionCreator: (postText: string) => (<const>{
    type: 'ADD_POST',
    postText,
  }),
  setUserProfile: (profile: ProfileType) => (<const>{
    type: 'SET_USER_PROFILE',
    profile,
  }),
  setUserStatus: (status: string) => (<const>{
    type: 'SET_USER_STATUS',
    status,
  }),
  deletePostAC: (postId: number) => (<const>{
    type: 'DELETE_POST',
    postId,
  }),
  savePhotoSuccess: (photos: PhotosType) => (<const>{
    type: 'SAVE_PHOTO_SUCCESS',
    photos,
  }),
  setProfileUpdateStatus: (status: 'edit' | 'success' | 'error') => {
    if (status === 'edit') return <const>{type: 'PROFILE_UPDATE_EDIT', status}
    if (status === 'success') return <const>{type: 'PROFILE_UPDATE_SUCCESS', status}
    // if (status === 'error')
    return <const>{type: 'PROFILE_UPDATE_ERROR', status}
  }
}
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// Санки
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(actions.setUserStatus(data))
}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status)
  if (data.resultCode === ResultCodesEnum.Sucsess) dispatch(actions.setUserStatus(status))
}
export const savePhoto = (file: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id
  if (userId !== null) {
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodesEnum.Sucsess) {
      await
        dispatch(getUserProfile(userId))
      dispatch(actions.setProfileUpdateStatus('success'))
    } else {
      let messageError = data.messages.length > 0 ? data.messages[0] : 'Some Error'
      let socialNetwork = messageError.slice(messageError.indexOf('>') + 1, -1).toLowerCase()
      // socialNetwork => word from message about error

      // @ts-ignore
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
