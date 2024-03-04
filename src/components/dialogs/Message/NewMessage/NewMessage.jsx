import s from './NewMessage.module.css';
import React from 'react';

let newMessageElement = React.createRef();

let addMessage = () => {
  let text = newMessageElement.current.value;
  alert(text);
};

const NewMessage = () => {
  return (
    <div className={s.newMessage}>
      <textarea className={s.input} ref={newMessageElement}></textarea>
      <button onClick={addMessage}>Spend message</button>
    </div>
  );
};

export default NewMessage;
