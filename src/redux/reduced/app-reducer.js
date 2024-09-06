import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SHOW_GLOBAL_ERROR_SUCCESS = 'auth/SHOW_GLOBAL_ERROR_SUCCESS'
const UN_SHOW_GLOBAL_ERROR_SUCCESS = 'auth/UN_SHOW_GLOBAL_ERROR_SUCCESS'

let initialState = {
  initialized: false,
  globalError: null,
}

const appReducer = (state = initialState, action) => {
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

const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS})
const showGlobalErrorSuccess = (globalError) => ({
  type: SHOW_GLOBAL_ERROR_SUCCESS,
  payload: {globalError}
})
const unShowGlobalErrorSuccess = () => ({
  type: UN_SHOW_GLOBAL_ERROR_SUCCESS,
  payload: {globalError: null}
})

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(initializedSuccessAC())
  })
  // When all promises resolved - then do dispatch
  //Promise.all([promise, somePromise]).then(()=>{dispatch(initializedSuccessAC())})
}
export const showGlobalError = (message) => (dispatch) => {
  dispatch(showGlobalErrorSuccess(message))
}
export const unShowGlobalError = () => (dispatch) => {
  dispatch(unShowGlobalErrorSuccess())
}

export default appReducer
