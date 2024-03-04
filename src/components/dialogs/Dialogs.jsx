import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

export default function Dialogs(props) {
  let dialogElements = props.dialogs.map((person) => (
    <DialogItem person={person} key={person.id} />
  ));

  let messagesElements = props.messages.map((messageItem) => (
    <Message messageItem={messageItem} key={messageItem.id} />
  ));
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{dialogElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
}
