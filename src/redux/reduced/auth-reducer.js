import { authAPI, securityApi } from '../../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
    {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});
const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.getMe();
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10){
      dispatch(getCaptchaUrl())
    }
    let messageError =
      data.messages.length > 0 ? data.messages[0] : 'Some error';
    dispatch(stopSubmit('login', { _error: messageError }));
  }
};

export const logout = () => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityApi.getCaptchaURL();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
