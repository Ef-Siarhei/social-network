import s from './NewMessage.module.css';
import React from 'react';
import {
  sendNewMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from '../../../../redux/reduced/messages-reducer';

const NewMessage = (props) => {
  let sendNewMessage = () => {
    props.dispatch(sendNewMessageActionCreator());
  };

  let onChangeMessage = (event) => {
    let text = event.target.value;
    props.dispatch(updateNewMessageBodyActionCreator(text));
  };

  return (
    <div className={s.newMessage}>
      <textarea
        onChange={onChangeMessage}
        className={s.input}
        value={props.newMessageText}
      />
      <button onClick={sendNewMessage}>Send message</button>
    </div>
  );
};

export default NewMessage;
