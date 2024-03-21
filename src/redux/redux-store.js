import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import profileReducer from './reduced/profile-reducer';
import messagesReducer from './reduced/messages-reducer';
import sidebarReducer from './reduced/sidebar-reducer';
import usersReducer from './reduced/users-reducer';
import authReducer from './reduced/auth-reducer';
import { thunk as thunkMiddleware } from 'redux-thunk';
// createStore устарел потому legacy_createStore as createStore

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;

window.store = store;
