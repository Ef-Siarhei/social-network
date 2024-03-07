import s from './NewMessage.module.css';
import React from 'react';
import {
  sendNewMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from '../../../../redux/state';

const NewMessage = (props) => {
  let sendNewMessage = () => {
    props.disPatch(sendNewMessageActionCreator());
  };

  let onChangeMessage = (event) => {
    let text = event.target.value;
    props.disPatch(updateNewMessageBodyActionCreator(text));
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
