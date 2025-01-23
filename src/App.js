import React, {lazy, Suspense} from 'react';
import {Route, Routes, HashRouter, Navigate} from 'react-router-dom';
import './App.scss';
import Music from './components/music/Music';
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import Settings from './components/settings/Settings';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/Login/Login';
import {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {initializeApp, showGlobalError, unShowGlobalError} from './redux/reduced/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import cn from 'classnames'
import PopUpError from "./components/common/popUp/PopUpError/PopUpError";

const ProfileContainer = lazy(() => import('./components/profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/users/UsersContainer'));

class App extends Component {
  catchUnhandledErrors = (reason, promise) => {
    const messageError = `Unhandled Rejection at: ${promise}, reason: ${reason}`
    this.props.showGlobalError(messageError)
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchUnhandledErrors)
  }

  // If we subscribed to addEventListener in componentDidMount,
  // we must unsubscribe from it addEventListener to componentWillUnmount.
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <>
        <div className={cn("app-wrapper")}>
          <HeaderContainer/>
          <Navbar/>
          <div className="app-wrapper-content">
            <Suspense fallback={<div>LOADING....</div>}>
              <Routes>
                <Route path="/" element={<Navigate to='/profile'/>}/>
                <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/users" element={<UsersContainer pageTitle={'Just go ahead!!!'}/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<div>404 NOT FOUND</div>}/>
              </Routes>
            </Suspense>
          </div>
        </div>

        {this.props.globalError &&
          <PopUpError message={this.props.globalError} unShowMessage={this.props.unShowGlobalError}/>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  globalError: state.app.globalError
});

const AppContainer = connect(mapStateToProps, {initializeApp, showGlobalError, unShowGlobalError})(App);

const SamuraiJSApp = (props) => {
  return (
    // <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </HashRouter>
    // </React.StrictMode>
  );
};
export default SamuraiJSApp;
