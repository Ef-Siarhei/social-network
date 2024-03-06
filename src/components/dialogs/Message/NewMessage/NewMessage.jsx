import s from './NewMessage.module.css';
import React from 'react';

const NewMessage = (props) => {
  let newMessageElement = React.createRef();

  let addNewMessage = () => {
    props.addMessage();
  };

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessageText(text);
  };

  return (
    <div className={s.newMessage}>
      <textarea
        onChange={onMessageChange}
        className={s.input}
        ref={newMessageElement}
        value={props.newMessageText}
      />
      <button onClick={addNewMessage}>Spend message</button>
    </div>
  );
};

export default NewMessage;
