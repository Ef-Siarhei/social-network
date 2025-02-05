import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../../api/api'
import {FormAction, stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from "../redux-store"
import {authAPI} from "../../api/auth-api";
import {securityApi} from "../../api/security-api";

let initialState = {
  id: null as (number | null),
  email: null as (string | null),
  login: null as (string | null),
  isAuth: false,
  captchaUrl: null as (string | null),
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'sn/auth/SET_USER_DATA':
    case 'sn/auth/GET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

// Actions creator
const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'sn/auth/SET_USER_DATA',
    payload: {id, email, login, isAuth},
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'sn/auth/GET_CAPTCHA_URL_SUCCESS',
    payload: {captchaUrl},
  } as const)
}

// Thunks creator
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.getMe()
  if (data.resultCode === ResultCodesEnum.Success) {
    let {id, email, login} = data.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha)
  if (data.resultCode === ResultCodesEnum.Success) {
    await dispatch(getAuthUserData())
  } else {
    if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
      await dispatch(getCaptchaUrl())
    }
    let messageError = data.messages.length > 0 ? data.messages[0] : 'Some error'
    dispatch(stopSubmit('login', {_error: messageError}))
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityApi.getCaptchaURL()
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
