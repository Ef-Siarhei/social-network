import {NavLink} from "react-router-dom";
import s from "./Dialogs.module.css";

const setActive = ({isActive}) => isActive ? s.active : ""

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id

  return (
    <div className={s.dialog}>
      <NavLink
        to={path}
        className={setActive}> {props.name}</NavLink>
    </div>
  )
}

const Message = (props) => {
  return (
    <div className={s.message}>{props.message}</div>
  )
}

export default function Dialogs() {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>
        <DialogItem name="Roman" id="1"/>
        <DialogItem name="Kat" id="2"/>
        <DialogItem name="Olga" id="3"/>
        <DialogItem name="Pasha" id="4"/>
        <DialogItem name="Serhei" id="5"/>
        <DialogItem name="Masha" id="6"/>
      </div>
      <div className={s.messages}>
        <Message message={"Hi, how are you?"}/>
        <Message message={"What is you do today?"}/>
        <Message message={"Come to me tomorrow."}/>
      </div>
    </div>
  );
}
