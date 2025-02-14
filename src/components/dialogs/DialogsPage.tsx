import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import NewMessageContainer from './Message/NewMessage/NewMessageContainer';
import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {getDialogs, getMessages} from "../../redux/selectors/dialogs-selectors";
import {getIsAuth} from "../../redux/selectors/auth-selectors";
import {Navigate} from "react-router-dom";


export const DialogsPage: FC = () => {
  const isAuth = useSelector(getIsAuth)
  const dialogs = useSelector(getDialogs)
  const messages = useSelector(getMessages)

  if (!isAuth) {
    return <Navigate to={'/login'}/>
  }

  let dialogElements = dialogs.map((dialogItem) => (
    <DialogItem dialogItem={dialogItem} key={dialogItem.id}/>
  ));

  let messagesElements = messages.map((messageItem) => (
    <Message messageItem={messageItem} key={messageItem.id}/>
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{dialogElements}</div>
      <div className={s.messages_block}>
        <div className={s.messages}>{messagesElements}</div>
        <NewMessageContainer/>
      </div>
    </div>
  );
}
