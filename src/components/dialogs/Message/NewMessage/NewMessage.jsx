import s from './NewMessage.module.css';
import React from 'react';
import {
  sendNewMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from '../../../../redux/state';

const NewMessage = (props) => {
  let newMessageElement = React.createRef();

  let sendNewMessage = () => {
    props.disPatch(sendNewMessageActionCreator());
  };

  let onChangeMessage = (event) => {
    let text = newMessageElement.current.value;
    props.disPatch(updateNewMessageBodyActionCreator(text));
  };

  return (
    <div className={s.newMessage}>
      <textarea
        onChange={onChangeMessage}
        className={s.input}
        ref={newMessageElement}
        value={props.newMessageText}
      />
      <button onClick={sendNewMessage}>Send message</button>
    </div>
  );
};

export default NewMessage;
