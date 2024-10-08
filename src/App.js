import React, {lazy, Suspense} from 'react';
import {Route, Routes, HashRouter} from 'react-router-dom';
import './App.scss';
import Music from './components/music/Music';
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import Settings from './components/settings/Settings';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/Login/Login';
import { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { initializeApp } from './redux/reduced/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';

const ProfileContainer = lazy(() => import('./components/profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/users/UsersContainer'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<div>LOADING....</div>}>
            <Routes>
              <Route path="/profile/:userId?" element={<ProfileContainer/>} />
              <Route path="/dialogs/*" element={<DialogsContainer/>} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const SamuraiJSApp = (props) => {
  return (
    <React.StrictMode>
      <HashRouter >
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  );
};
export default SamuraiJSApp;
