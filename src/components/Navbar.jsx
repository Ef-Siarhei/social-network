import n from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={n.nav}>
      <ul>
        <li className={n.item}>Profile</li>
        <li className={n.item}>Messages</li>
        <li className={n.item}>News</li>
        <li className={n.item}>Music</li>
        <li className={n.item}>Settings</li>
      </ul>
    </nav>
  );
}
