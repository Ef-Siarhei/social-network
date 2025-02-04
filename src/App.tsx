import React, {Component, FC, lazy, Suspense} from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';
import Music from './components/music/Music';
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import Settings from './components/settings/Settings';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {initializeApp, showGlobalError, unShowGlobalError} from './redux/reduced/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store, {AppStateType} from './redux/redux-store';
import cn from 'classnames'
import PopUpError from "./components/common/popUp/PopUpError/PopUpError";

// const ProfileContainer = lazy(() => import('./components/profile/ProfileContainer')as Promise<{ default: React.ComponentType }>);
const ProfileContainer = lazy(() => import('./components/profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/users/UsersContainer'));

class App extends Component<PropsType> {
  catchUnhandledErrors = (event: PromiseRejectionEvent) => {
    const messageError = `Unhandled Rejection at: ${event.promise}, reason: ${event.reason}`
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

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
  initializeApp: () => void
  showGlobalError: (message: string) => void
  unShowGlobalError: () => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  globalError: state.app.globalError
});

const AppContainer = connect(mapStateToProps, {initializeApp, showGlobalError, unShowGlobalError})(App);

const SamuraiJSApp: FC = () => {
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
