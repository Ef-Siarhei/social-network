import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../redux-store"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SHOW_GLOBAL_ERROR_SUCCESS = 'auth/SHOW_GLOBAL_ERROR_SUCCESS'
const UN_SHOW_GLOBAL_ERROR_SUCCESS = 'auth/UN_SHOW_GLOBAL_ERROR_SUCCESS'

type InitialStateType = {
  initialized: boolean
  globalError: null | string
}
type ActionsType =
  InitializedSuccessActionType |
  ShowAndUnShowGlobalErrorSuccessActionType

let initialState: InitialStateType = {
  initialized: false,
  globalError: null,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {...state, initialized: true}
    }
    case SHOW_GLOBAL_ERROR_SUCCESS:
    case UN_SHOW_GLOBAL_ERROR_SUCCESS: {
      return {...state, ...action.payload}
    }
    default:
      return state
  }
}

// Actions creator
type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}
const initializedSuccessAC = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

type ShowAndUnShowGlobalErrorSuccessActionType = {
  type: typeof SHOW_GLOBAL_ERROR_SUCCESS | typeof UN_SHOW_GLOBAL_ERROR_SUCCESS
  payload: {
    globalError: null | string
  }
}
const showGlobalErrorSuccess = (globalError: any): ShowAndUnShowGlobalErrorSuccessActionType => ({
  type: SHOW_GLOBAL_ERROR_SUCCESS,
  payload: {globalError}
})
const unShowGlobalErrorSuccess = (): ShowAndUnShowGlobalErrorSuccessActionType => ({
  type: UN_SHOW_GLOBAL_ERROR_SUCCESS,
  payload: {globalError: null}
})

// Thunk creator
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
export const initializeApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(initializedSuccessAC())
  })
  // When all promises resolved - then do dispatch
  //Promise.all([promise, somePromise]).then(()=>{dispatch(initializedSuccessAC())})
}
export const showGlobalError = (message: string): ThunkType => (dispatch) => {
  dispatch(showGlobalErrorSuccess(message))
}
export const unShowGlobalError = (): ThunkType => (dispatch) => {
  dispatch(unShowGlobalErrorSuccess())
}

export default appReducer
