import s from './NewMessage.module.css';
import React from 'react';
import {
  addNewMessageActionCreator,
  updateNewMessageTextActionCreator,
} from '../../../../redux/state';

const NewMessage = (props) => {
  let newMessageElement = React.createRef();

  let addNewMessage = () => {
    props.disPatch(addNewMessageActionCreator());
  };

  let onChangeMessage = () => {
    let text = newMessageElement.current.value;
    props.disPatch(updateNewMessageTextActionCreator(text));
  };

  return (
    <div className={s.newMessage}>
      <textarea
        onChange={onChangeMessage}
        className={s.input}
        ref={newMessageElement}
        value={props.newMessageText}
      />
      <button onClick={addNewMessage}>Send message</button>
    </div>
  );
};

export default NewMessage;
