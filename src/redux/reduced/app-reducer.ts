import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "../redux-store"


type ActionsTypes = InferActionsTypes<typeof actions>

let initialState = {
  initialized: false,
  globalError: null,
}
type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS': {
      return {...state, initialized: true}
    }
    case 'SHOW_GLOBAL_ERROR_SUCCESS':
    case 'UN_SHOW_GLOBAL_ERROR_SUCCESS': {
      return {...state, ...action.payload}
    }
    default:
      return state
  }
}

// Actions creator
const actions = {
  initializedSuccessAC: () => ({type: 'INITIALIZED_SUCCESS'} as const),
  showGlobalErrorSuccess: (globalError: any) => ({
    type: 'SHOW_GLOBAL_ERROR_SUCCESS',
    payload: {globalError}
  } as const),
  unShowGlobalErrorSuccess: () => ({
    type: 'UN_SHOW_GLOBAL_ERROR_SUCCESS',
    payload: {globalError: null}
  } as const)
}

// Thunk creator
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(actions.initializedSuccessAC())
  })
  // When all promises resolved - then do dispatch
  //Promise.all([promise, somePromise]).then(()=>{dispatch(initializedSuccessAC())})
}
export const showGlobalError = (message: string): ThunkType => (dispatch) => {
  dispatch(actions.showGlobalErrorSuccess(message))
}
export const unShowGlobalError = (): ThunkType => (dispatch) => {
  dispatch(actions.unShowGlobalErrorSuccess())
}

export default appReducer
