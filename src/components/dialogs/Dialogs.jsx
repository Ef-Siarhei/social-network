import {NavLink} from "react-router-dom";
import s from "./Dialogs.module.css";

const setActive = ({isActive}) => isActive ? s.active : ""

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id

  return (
    <div>
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

let peoplesData = [
  {id: 1, name: 'Roman'},
  {id: 2, name: 'Kat'},
  {id: 3, name: 'Olga'},
  {id: 4, name: 'Pasha'},
  {id: 5, name: 'Sergei'},
  {id: 6, name: 'Masha'},
]

let messageData = [
  {id: 1, message: 'Hi, how are you?'},
  {id: 2, message: 'What is you do today?'},
  {id: 3, message: 'Come to me tomorrow.'},
  {id: 4, message: 'Pasha'},
  {id: 5, message: 'Sergei'},
  {id: 6, message: 'Masha'},
]

export default function Dialogs() {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>
        <DialogItem name={peoplesData[0].name} id={peoplesData[0].id}/>
        <DialogItem name={peoplesData[1].name} id={peoplesData[1].id}/>
        <DialogItem name={peoplesData[2].name} id={peoplesData[2].id}/>
        <DialogItem name={peoplesData[3].name} id={peoplesData[3].id}/>
        <DialogItem name={peoplesData[4].name} id={peoplesData[4].id}/>
        <DialogItem name={peoplesData[5].name} id={peoplesData[5].id}/>
      </div>
      <div className={s.messages}>
        <Message message={messageData[0].message}/>
        <Message message={messageData[1].message}/>
        <Message message={messageData[2].message}/>
        <Message message={messageData[3].message}/>
        <Message message={messageData[4].message}/>
        <Message message={messageData[5].message}/>
      </div>
    </div>
  );
}
