import { combineReducers, legacy_createStore as createStore } from 'redux';
import profileReducer from './reduced/profile-reducer';
import messagesReducer from './reduced/messages-reducer';
import sidebarReducer from './reduced/sidebar-reducer';
// createStore устарел потому legacy_createStore as createStore

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sidebar: sidebarReducer,
});

let store = createStore(reducers);
export default store;

window.store = store;
