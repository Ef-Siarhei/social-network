import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessageContainer from './Message/NewMessage/NewMessageContainer';
import React, {FC} from 'react';
import {DialogsType, MessagesType} from "../../redux/reduced/messages-reducer";

type OwnPropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
}

 const Dialogs: FC<OwnPropsType> = (props) => {
  let dialogElements = props.dialogs.map((dialogItem) => (
    <DialogItem dialogItem={dialogItem} key={dialogItem.id} />
  ));

  let messagesElements = props.messages.map((messageItem) => (
    <Message messageItem={messageItem} key={messageItem.id} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{dialogElements}</div>
      <div className={s.messages_block}>
        <div className={s.messages}>{messagesElements}</div>
        <NewMessageContainer />
      </div>
    </div>
  );
}
export default Dialogs
