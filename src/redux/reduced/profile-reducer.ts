import {profileAPI} from '../../api/api';
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../../types/types";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const PROFILE_UPDATE_SUCCESS = 'profile/PROFILE_UPDATE_SUCCESS'
const PROFILE_UPDATE_ERROR = 'profile/PROFILE_UPDATE_ERROR'
const PROFILE_UPDATE_EDIT = 'profile/PROFILE_UPDATE_EDIT'

let initialState = {
  profile: null as ProfileType | null,
  posts: [
    {id: 1, message: 'Hi, how are you?', like: 5},
    {id: 2, message: "It's my first post.", like: 20},
  ] as Array<PostType>,
  status: '',
  profileUpdateStatus: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: PostType = {
        id: 3,
        message: action.postText,
        like: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    }
    case SET_USER_PROFILE: {
      return {...state, profile: action.profile};
    }
    case SET_USER_STATUS: {
      return {...state, status: action.status};
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }
    }
    case PROFILE_UPDATE_SUCCESS: {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    case PROFILE_UPDATE_ERROR: {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    case PROFILE_UPDATE_EDIT: {
      return {
        ...state,
        profileUpdateStatus: action.status
      }
    }
    default:
      return state;
  }
};

type AddNewPostActionCreatorType = {
  type: typeof ADD_POST
  postText: string
}
export const addNewPostActionCreator = (postText: string): AddNewPostActionCreatorType => ({
  type: ADD_POST,
  postText,
});
type SetUserProfileType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});
type SetUserStatusType = {
  type: typeof SET_USER_STATUS
  status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({
  type: SET_USER_STATUS,
  status,
});
type DeletePostACType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePostAC = (postId: number): DeletePostACType => ({
  type: DELETE_POST,
  postId,
});
type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})
type SetProfileUpdateStatusType = {
  type: typeof PROFILE_UPDATE_EDIT | typeof PROFILE_UPDATE_SUCCESS | typeof PROFILE_UPDATE_ERROR
  status: 'edit' | 'success' | 'error'
}
export const setProfileUpdateStatus = (status: 'edit' | 'success' | 'error'): SetProfileUpdateStatusType => {
  if (status === 'edit') return {type: PROFILE_UPDATE_EDIT, status}
  if (status === 'success') return {type: PROFILE_UPDATE_SUCCESS, status}
  // if (status === 'error')
  return {type: PROFILE_UPDATE_ERROR, status}
}

// Санки
export const getUserProfile = (userId: string) => async (dispatch: any) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};
export const getUserStatus = (userId: string) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response.data));
};
export const updateUserStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) dispatch(setUserStatus(status));
};
export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
};
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    // dispatch(saveProfileSuccess(profile))
    dispatch(getUserProfile(userId))
    dispatch(setProfileUpdateStatus('success'));
  } else {
    let messageError = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error';
    let socialNetwork = messageError.slice(messageError.indexOf('>') + 1, -1).toLowerCase()
    // socialNetwork => word from message about error
    dispatch(stopSubmit('edit-profile', {'contacts': {[socialNetwork]: messageError}}))
    dispatch(setProfileUpdateStatus('error'));
  }
}
export const setProfileStatusEdit = (status: 'edit' | 'success' | 'error') => async (dispatch: any) => {
  dispatch(setProfileUpdateStatus(status));
};

export const addPost = (postText: string) => (dispatch: any) => {
  dispatch(addNewPostActionCreator(postText));
};

export default profileReducer;
