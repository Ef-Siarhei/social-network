import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SHOW_GLOBAL_ERROR_SUCCESS = 'auth/SHOW_GLOBAL_ERROR_SUCCESS'
const UN_SHOW_GLOBAL_ERROR_SUCCESS = 'auth/UN_SHOW_GLOBAL_ERROR_SUCCESS'

export type InitialStateType = {
  initialized: boolean
  globalError: null | string
}

let initialState: InitialStateType = {
  initialized: false,
  globalError: null,
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

type ShowAndUnShowGlobalErrorSuccessActionType = {
  type: typeof SHOW_GLOBAL_ERROR_SUCCESS | typeof UN_SHOW_GLOBAL_ERROR_SUCCESS
  payload: {
    globalError: null | string
  }
}

const initializedSuccessAC = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})
const showGlobalErrorSuccess = (globalError: any): ShowAndUnShowGlobalErrorSuccessActionType => ({
  type: SHOW_GLOBAL_ERROR_SUCCESS,
  payload: {globalError}
})
const unShowGlobalErrorSuccess = (): ShowAndUnShowGlobalErrorSuccessActionType => ({
  type: UN_SHOW_GLOBAL_ERROR_SUCCESS,
  payload: {globalError: null}
})

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(initializedSuccessAC())
  })
  // When all promises resolved - then do dispatch
  //Promise.all([promise, somePromise]).then(()=>{dispatch(initializedSuccessAC())})
}
export const showGlobalError = (message: any) => (dispatch: any) => {
  dispatch(showGlobalErrorSuccess(message))
}
export const unShowGlobalError = () => (dispatch: any) => {
  dispatch(unShowGlobalErrorSuccess())
}

export default appReducer
