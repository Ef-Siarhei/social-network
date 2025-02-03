import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../../api/api'
import {stopSubmit} from 'redux-form'
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "../redux-store"
import {authAPI} from "../../api/auth-api";
import {securityApi} from "../../api/security-api";

type InitialStateType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}

type ActionsTypes = InferActionsTypes<typeof actions>

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
    case 'GET_CAPTCHA_URL_SUCCESS': {
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
    type: 'SET_USER_DATA',
    payload: {id, email, login, isAuth},
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: {captchaUrl},
  } as const)
}

// Thunks creator
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.getMe()
  if (data.resultCode === ResultCodesEnum.Sucsess) {
    let {id, email, login} = data.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha)
  if (data.resultCode === ResultCodesEnum.Sucsess) {
    await dispatch(getAuthUserData())
  } else {
    if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
      await dispatch(getCaptchaUrl())
    }
    let messageError =
      data.messages.length > 0 ? data.messages[0] : 'Some error'

    // @ts-ignore
    dispatch(stopSubmit('login', {_error: messageError}))
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === ResultCodesEnum.Sucsess) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityApi.getCaptchaURL()
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
