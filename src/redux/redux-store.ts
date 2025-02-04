import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose, Action,
} from 'redux'
import profileReducer from './reduced/profile-reducer'
import messagesReducer from './reduced/messages-reducer'
import sidebarReducer from './reduced/sidebar-reducer'
import usersReducer from './reduced/users-reducer'
import authReducer from './reduced/auth-reducer'
import {thunk as thunkMiddleware, ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './reduced/app-reducer'
// createStore устарел потому legacy_createStore as createStore

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]:(...args: any[]) => infer U } ? U : never

export type BaseThunkType<BasicAction extends Action, ReturnType = Promise<void>> = ThunkAction<ReturnType, AppStateType, unknown, BasicAction>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(
  rootReducer, /* preloadedState, */
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

// @ts-ignore
window.store = store

export default store

