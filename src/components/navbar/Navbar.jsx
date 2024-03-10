import n from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import Friends from '../friends/Friends';
import StoreContext from '../../store-context';

export default function Navbar() {
  const setActive = ({ isActive }) => (isActive ? n.active : '');
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

        <NavLink to="/settings" className={setActive}>
          Settings
        </NavLink>
      </div>
      <StoreContext.Consumer>
        {(store) => {
          return <Friends store={store} />;
        }}
      </StoreContext.Consumer>
    </nav>
  );
}
