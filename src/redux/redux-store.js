import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import profileReducer from './reduced/profile-reducer';
import messagesReducer from './reduced/messages-reducer';
import sidebarReducer from './reduced/sidebar-reducer';
import usersReducer from './reduced/users-reducer';
import authReducer from './reduced/auth-reducer';
import { thunk as thunkMiddleware } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './reduced/app-reducer';
// createStore устарел потому legacy_createStore as createStore

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
export default store;

window.store = store;
