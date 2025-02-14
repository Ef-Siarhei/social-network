import React, {FC, lazy, Suspense, useEffect} from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';
import Music from './components/music/Music';
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import Settings from './components/settings/Settings';
import {LoginPage} from './components/Login/LoginPage';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {initializeApp, showGlobalError, unShowGlobalError} from './redux/reduced/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store, {AppDispatch} from './redux/redux-store';
import cn from 'classnames'
import PopUpError from "./components/common/popUp/PopUpError/PopUpError";
import {QueryParamProvider} from "use-query-params";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";
import {Header} from "./components/header/Header";
import {getGlobalError, getInitialized} from "./redux/selectors/app-selectors";


const ProfileContainer = lazy(() => import('./components/profile/ProfileContainer'));
const DialogsPage = lazy(() => import('./components/dialogs/DialogsPage').then(module => ({default: module.DialogsPage})));// then if export not default
const UsersPage = lazy(() => import('./components/users/UsersContainer'));

const App: FC = () => {
  const initialized = useSelector(getInitialized)
  const globalError = useSelector(getGlobalError)
  const dispatch: AppDispatch = useDispatch()

  const catchUnhandledErrors = (event: PromiseRejectionEvent) => {
    const messageError = `Unhandled Rejection at: ${event.promise}, reason: ${event.reason}`
    dispatch(showGlobalError(messageError))
  }

  const unShowMessage = () => {
    dispatch(unShowGlobalError())
  }

  useEffect(() => {
    dispatch(initializeApp())
    window.addEventListener('unhandledrejection', catchUnhandledErrors)
    // If we subscribed to addEventListener in componentDidMount,
    // we must unsubscribe from it addEventListener to componentWillUnmount.
    // If we subscribed to addEventListener in useEffect.
    // we must unsubscribe from it addEventListener return function in useEffect .
    return () => {
      window.removeEventListener('unhandledrejection', catchUnhandledErrors)
    }
  },[])

  if (!initialized) {
    return <Preloader/>
  }

  return (
    <>
      <div className={cn("app-wrapper")}>
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Suspense fallback={<div>LOADING....</div>}>
              <Routes>
                <Route path="/" element={<Navigate to='/profile'/>}/>
                <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                <Route path="/dialogs/*" element={<DialogsPage/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/users" element={<UsersPage pageTitle={'Just go ahead!!!'}/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<div>404 NOT FOUND</div>}/>
              </Routes>
            </Suspense>
          </QueryParamProvider>
        </div>
      </div>

      {globalError &&
        <PopUpError message={globalError} unShowMessage={unShowMessage}/>
      }
    </>
  );
}


const SamuraiJSApp: FC = () => {
  return (
    // <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>
    // </React.StrictMode>
  );
};
export default SamuraiJSApp;
