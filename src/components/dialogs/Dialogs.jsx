import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
console.log(s);

export default function Dialogs(props) {
  let dialogElements = props.dialogs.map((person) => (
    <DialogItem person={person} key={person.id} />
  ));

  let messagesElements = props.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{dialogElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
}
