import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {...state, initialized: true}
    }
    default:
      return state
  }
}

const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData())
  promise.then(() => {
    dispatch(initializedSuccessAC())
  })
  // When all promises resolved - then do dispatch
  //Promise.all([promise, somePromise]).then(()=>{dispatch(initializedSuccessAC())})
}

export default appReducer
