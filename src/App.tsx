import React, {FC, lazy, Suspense, useEffect} from 'react';
import {HashRouter, Navigate, NavLink, Route, Routes, useLocation} from 'react-router-dom';
import './App.scss';
import Music from './components/music/Music';
import News from './components/news/News';
import Settings from './components/settings/Settings';
import {LoginPage} from './components/Login/LoginPage';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {initializeApp, showGlobalError, unShowGlobalError} from './redux/reduced/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store, {AppDispatch} from './redux/redux-store';
import PopUpError from "./components/common/popUp/PopUpError/PopUpError";
import {QueryParamProvider} from "use-query-params";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";
import {getGlobalError, getInitialized} from "./redux/selectors/app-selectors";
import {Friends} from "./components/friends/Friends";
import {Header} from "./components/header/Header";

import {LaptopOutlined, NotificationOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, MenuProps, theme} from 'antd';

const ProfileContainer = lazy(() => import('./components/profile/ProfileContainer'));
const DialogsPage = lazy(() => import('./components/dialogs/DialogsPage').then(module => ({default: module.DialogsPage})));// then if export not default
const UsersPage = lazy(() => import('./components/users/UsersContainer'));
const ChatPage = lazy(() => import('./pages/Chat/ChatPage').then(module => ({default: module.ChatPage})));

// Antd -----------------------------------------------------------------------
const {Content, Footer, Sider} = Layout;
const {SubMenu} = Menu


const menuSidebar = [
  {
    label: 'Profile',
    children: ['Profile', 'Dialogs']
  },
  {
    label: 'Developers',
    children: ['Users', 'Chat']
  },
  {
    label: 'Others',
    children: ['News', 'Music']
  },
  {
    label: 'Settings',
    children: null
  },
]
const sidebar: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined, SettingOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: menuSidebar[index].children ? menuSidebar[index].label :
        <NavLink to={`/${menuSidebar[index].label.toLowerCase()}`}>{menuSidebar[index].label}</NavLink>,

      children: menuSidebar[index].children ? [...menuSidebar[index].children].map((item) => {
        return {
          key: '/' + item.toLowerCase(),
          label: <NavLink to={`/${item.toLowerCase()}`}>{item}</NavLink>,
        };
      }) : null
    };
  },
);


const App: React.FC = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const initialized = useSelector(getInitialized)
  const globalError = useSelector(getGlobalError)
  const dispatch: AppDispatch = useDispatch()
  const location = useLocation()

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
  }, [])

  if (!initialized) {
    return <Preloader/>
  }

  return (
    <Layout>
      <Header/>
      <div style={{padding: '0 48px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}
        >
          <Sider style={{background: colorBgContainer}} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              defaultOpenKeys={['sub1']}
              style={{height: 'auto'}}
              items={sidebar}
            >
              {/*<SubMenu key={'sub1'} icon={<UserOutlined/>} title={'My Profile'}>*/}
              {/*  <Menu.Item key={'1'}><NavLink to="/profile"> Profile </NavLink></Menu.Item>*/}
              {/*  <Menu.Item key={'2'}><NavLink to="/dialogs"> Dialogs </NavLink></Menu.Item>*/}
              {/*</SubMenu>*/}
              {/*<SubMenu key={'sub2'} title={'Developers'} icon={<LaptopOutlined/>}>*/}
              {/*  <Menu.Item key={'3'}><NavLink to="/users"> Users </NavLink></Menu.Item>*/}
              {/*</SubMenu>*/}
              {/*  <Menu.Item key={'4'}><NavLink to="/music"> Music </NavLink></Menu.Item>*/}
              {/*  <Menu.Item key={'5'}><NavLink to="/news"> News </NavLink></Menu.Item>*/}
              {/*  <Menu.Item key={'6'} icon={<SettingOutlined/>}><NavLink to="/settings"> Settings </NavLink></Menu.Item>*/}
            </Menu>
            <Friends/>
          </Sider>
          <Content style={{padding: '0 24px', minHeight: 280}}>
            <Suspense fallback={<div>LOADING....</div>}>
              <QueryParamProvider adapter={ReactRouter6Adapter}>
                <Routes>
                  <Route path="/" element={<Navigate to='/profile'/>}/>
                  <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                  <Route path="/dialogs/*" element={<DialogsPage/>}/>
                  <Route path="/news" element={<News/>}/>
                  <Route path="/music" element={<Music/>}/>
                  <Route path="/users" element={<UsersPage pageTitle={'Just go ahead!!!'}/>}/>
                  <Route path="/settings" element={<Settings/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/chat" element={<ChatPage/>}/>
                  <Route path="*" element={<div>404 NOT FOUND</div>}/>
                </Routes>
              </QueryParamProvider>
            </Suspense>
            {globalError &&
              <PopUpError message={globalError} unShowMessage={unShowMessage}/>
            }
          </Content>
        </Layout>
      </div>
      <Footer style={{textAlign: 'center'}}>
        Efimenko Sergei ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
// Antd -----------------------------------------------------------------------

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
