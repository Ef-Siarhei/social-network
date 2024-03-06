import s from './NewMessage.module.css';
import React from 'react';

const NewMessage = (props) => {
  let newMessageElement = React.createRef();

  let addNewMessage = () => {
    props.disPatch({
      type: 'ADD-MESSAGE',
    });
  };

  let onChangeMessage = () => {
    let text = newMessageElement.current.value;
    props.disPatch({
      type: 'UPDATE-NEW-MESSAGE-TEXT',
      newText: text,
    });
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
