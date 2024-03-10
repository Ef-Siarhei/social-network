import s from './NewMessage.module.css';

const NewMessage = (props) => {
  let sendNewMessage = () => {
    props.sendMessage();
  };

  let onChangeMessage = (event) => {
    let text = event.target.value;
    props.changeMessage(text);
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
