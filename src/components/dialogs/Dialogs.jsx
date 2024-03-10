import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessageContainer from './Message/NewMessage/NewMessageContainer';

export default function Dialogs(props) {
  let messagesPage = props.store.getState().messagesPage;

  let dialogElements = messagesPage.dialogs.map((person) => (
    <DialogItem person={person} key={person.id} />
  ));

  let messagesElements = messagesPage.messages.map((messageItem) => (
    <Message messageItem={messageItem} key={messageItem.id} />
  ));
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{dialogElements}</div>
      <div className={s.messages_block}>
        <div className={s.messages}>{messagesElements}</div>
        <NewMessageContainer store={props.store} />
      </div>
    </div>
  );
}
