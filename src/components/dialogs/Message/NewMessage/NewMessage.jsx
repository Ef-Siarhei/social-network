import s from './NewMessage.module.css';
import React from 'react';

const NewMessage = (props) => {
  let newMessageElement = React.createRef();

  let addNewMessage = () => {
    props.addMessage();
  };

  let onChangeMessage = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessageText(text);
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
