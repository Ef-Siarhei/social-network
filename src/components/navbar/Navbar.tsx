import n from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getIsAuth} from "../../redux/selectors/auth-selectors";
import {Friends} from "../friends/Friends";

type NavLinkProps = {
  isActive: boolean
}

function Navbar() {
  const isAuth = useSelector(getIsAuth)

  const setActive = ({isActive}: NavLinkProps) => (isActive ? n.active : '');
  return (
    <nav className={n.nav}>
      <div className={n.list}>
        <NavLink to="/profile" className={setActive}>
          Profile
        </NavLink>

        <NavLink to="/dialogs" className={setActive}>
          Messages
        </NavLink>

        <NavLink to="/news" className={setActive}>
          News
        </NavLink>

        <NavLink to="/music" className={setActive}>
          Music
        </NavLink>

        <NavLink to="/users" className={setActive}>
          Users
        </NavLink>

        <NavLink to="/settings" className={setActive}>
          Settings
        </NavLink>
      </div>
      {isAuth && <Friends/>}
    </nav>
  );
}

export default Navbar
