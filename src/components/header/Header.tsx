import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import UserIcon from '../common/UserIcon/UserIcon';
import {FC} from "react";

type PropsType = {
  isAuth: boolean
  login: string | null
  logout: () => void
}

 const Header: FC<PropsType> = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <>
            <UserIcon img={null}/>
            {props.login}
            <button onClick={props.logout}>Log out</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
}
export default Header
