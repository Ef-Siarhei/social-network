import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import UserIcon from '../common/UserIcon/UserIcon';
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getLogin} from "../../redux/selectors/auth-selectors";
import {logout} from "../../redux/reduced/auth-reducer";
import {AppDispatch} from "../../redux/redux-store";


export const Header: FC = () => {
  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)
  const dispatch: AppDispatch = useDispatch()

  return (
    <header className={s.header}>
      <img
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324"
        alt=""
      />
      <div className={s.loginBlock}>
        {isAuth ? (
          <>
            <UserIcon src={''}/>
            {login}
            <button onClick={() => dispatch(logout)}>Log out</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
}
