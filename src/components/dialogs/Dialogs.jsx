import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

export default function Dialogs() {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>
        <div className={s.dialog}>
          <NavLink to="/dialogs/1">Roman</NavLink>
        </div>
        <div className={s.dialog + " " + s.active}>
          <NavLink to="/dialogs/2">Kat</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/3">Olga</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/4">Pasha</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/5">Sergei</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialogs/6">Mash</NavLink>
        </div>
      </div>
      <div className={s.messages}>
        <div className={s.message}>Hi, how are you?</div>
        <div className={s.message}>What is you do today?</div>
        <div className={s.message}>Come to me tomorrow.</div>
      </div>
    </div>
  );
}
