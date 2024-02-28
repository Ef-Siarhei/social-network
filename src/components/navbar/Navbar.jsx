import n from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={n.nav}>
      <ul>
        <li className={n.item}>
          <a href="/profile">Profile</a>
        </li>
        <li className={n.item}>
          <a href="dialogs">Messages</a>
        </li>
        <li className={n.item}>
          <a href="news">News</a>
        </li>
        <li className={n.item}>
          <a href="music">Music</a>
        </li>
        <li className={n.item}>
          <a href="settings">Settings</a>
        </li>
      </ul>
    </nav>
  );
}
