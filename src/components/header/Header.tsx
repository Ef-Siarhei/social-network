import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import UserIcon from '../common/UserIcon/UserIcon';
import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, getLogin} from "../../redux/selectors/auth-selectors";
import {logout} from "../../redux/reduced/auth-reducer";
import {AppDispatch} from "../../redux/redux-store";
import logo from "../../assets/images/logo.svg";
import {getPhotos} from "../../redux/selectors/profile-selectors";
import {Avatar, Button, Layout, Menu, MenuProps, Typography} from "antd";

const items1: MenuProps['items'] = ['Developers', 'Users'].map((key) => ({
  key,
  label: <NavLink to={'/users'}>{key}</NavLink>
}));

export const Header: FC = () => {
  const {Header} = Layout;
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(getLogin)
  const iconPhotos = useSelector(getPhotos)
  const dispatch: AppDispatch = useDispatch()

  const logOutCallBack = async () => {
    await dispatch(logout())
  }

  return (
    <Header className={s.header}>
      <img src={logo} alt={'FIMA YSA'} className={s.headerLogoImg}/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items1}
        style={{flex: 1, minWidth: 0}}
      />
      <div>
        {isAuth ? (
          <>
            <Avatar src={<UserIcon src={iconPhotos?.small}/>} size={'large'}/>
            <Typography.Text italic className={s.headerOwnNickName}>{login}</Typography.Text>
            <Button type={'primary'} ghost onClick={logOutCallBack}>Log out</Button>
          </>
        ) : (
          <Button type={'primary'} ghost><NavLink to="/login">Login</NavLink></Button>
        )}
      </div>
    </Header>
  );
}
