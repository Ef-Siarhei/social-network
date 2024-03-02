import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

const setActive = ({ isActive }) => (isActive ? s.active : '');

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;

  return (
    <div>
      <NavLink to={path} className={setActive}>
        {' '}
        {props.name}
      </NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

let dialogs = [
  { id: 1, name: 'Roman' },
  { id: 2, name: 'Kat' },
  { id: 3, name: 'Olga' },
  { id: 4, name: 'Pasha' },
  { id: 5, name: 'Sergei' },
  { id: 6, name: 'Masha' },
];

let messages = [
  { id: 1, message: 'Hi, how are you?' },
  { id: 2, message: 'What is you do today?' },
  { id: 3, message: 'Come to me tomorrow.' },
  { id: 4, message: 'Pasha' },
  { id: 5, message: 'Sergei' },
  { id: 6, message: 'Masha' },
];

let dialogElements = dialogs.map((d) => (
  <DialogItem name={d.name} id={d.id} key={d.id} />
));

let messagesElements = messages.map((m) => (
  <Message message={m.message} key={m.id} />
));

export default function Dialogs() {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{dialogElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
}
