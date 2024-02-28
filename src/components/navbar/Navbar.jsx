import n from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={n.nav}>
      <ul>
        <li className={n.item}>
          <Link to="/profile">Profile</Link>
        </li>
        <li className={n.item}>
          <Link to="/dialogs">Messages</Link>
        </li>
        <li className={n.item}>
          <Link to="/news">News</Link>
        </li>
        <li className={n.item}>
          <Link to="/music">Music</Link>
        </li>
        <li className={n.item}>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
