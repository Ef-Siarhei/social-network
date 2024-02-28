import n from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={n.nav}>
      <ul>
        <li className={n.item}>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? n.active : "")}
          >
            Profile
          </NavLink>
        </li>
        <li className={n.item}>
          <NavLink
            to="/dialogs"
            className={({ isActive }) => (isActive ? n.active : "")}
          >
            Messages
          </NavLink>
        </li>
        <li className={n.item}>
          <NavLink
            to="/news"
            className={({ isActive }) => (isActive ? n.active : "")}
          >
            News
          </NavLink>
        </li>
        <li className={n.item}>
          <NavLink
            to="/music"
            className={({ isActive }) => (isActive ? n.active : "")}
          >
            Music
          </NavLink>
        </li>
        <li className={n.item}>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? n.active : "")}
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
