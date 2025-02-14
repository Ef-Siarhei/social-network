import {AppStateType} from "../redux-store";

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};
export const getCaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl;
};
export const getLogin = (state: AppStateType) => state.auth.login
