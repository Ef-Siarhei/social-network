import {profileAPI} from '../../api/api';
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
// const SAVE_PROFILE_SUCCESS = 'profile/SAVE_PROFILE_SUCCESS'

let initialState = {
  profile: null,
  posts: [
    {id: 1, message: 'Hi, how are you?', like: '5'},
    {id: 2, message: "It's my first post.", like: '20'},
  ],
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: 3,
        message: action.postText,
        like: '0',
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
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
        profile: {...state.profile, photos: action.photos},
      }
    }
    // case SAVE_PROFILE_SUCCESS: {
    //   return {
    //     ...state,
    //     profile: {...state.profile, ...action.formData}
    //   }
    // }
    default:
      return state;
  }
};

export const addNewPostActionCreator = (postText) => ({
  type: ADD_POST,
  postText,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});
export const deletePostAC = (postId) => ({
  type: DELETE_POST,
  postId,
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})
// export const saveProfileSuccess = (formData) => ({
//   type: SAVE_PROFILE_SUCCESS,
//   formData
// })

export const getUserProfile = (userId) => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};
export const getUserStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response.data));
};
export const updateUserStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) dispatch(setUserStatus(status));
};
export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id
  const response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    // dispatch(saveProfileSuccess(profile))
    dispatch(getUserProfile(userId))
  } else {
    let messageError = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error';
    let socialNetwork = messageError.slice(messageError.indexOf('>') + 1, -1).toLowerCase()
    // socialNetwork => word from message about error
    dispatch(stopSubmit('edit-profile', {'contacts': {[socialNetwork]: messageError}}))
  }
}
export const addPost = (postText) => (dispatch) => {
  dispatch(addNewPostActionCreator(postText));
};

export default profileReducer;
