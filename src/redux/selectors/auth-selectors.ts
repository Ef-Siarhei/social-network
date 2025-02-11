import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

const getIsAuthPrimitiveSelector = (state: AppStateType) => {
  return state.auth.isAuth;
};
export const getIsAuth = createSelector([getIsAuthPrimitiveSelector], (isAuth) => {
  return isAuth;
})

export const getCaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl;
};
