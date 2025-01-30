import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityApi} from '../../api/api'
import {stopSubmit} from 'redux-form'
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../redux-store"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

type InitialStateType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}

type ActionsType =
  SetAuthUserDataActionType |
  GetCaptchaUrlSuccessActionType

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS: {
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
type SetAuthUserDataActionPayloadType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
}
const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {id, email, login, isAuth},
})

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl: string },
}
const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl},
})

// Thunks creator
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.getMe()
  if (data.resultCode === ResultCodesEnum.Sucsess) {
    let {id, email, login} = data.data
    dispatch(setAuthUserData(id, email, login, true))
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
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await securityApi.getCaptchaURL()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
