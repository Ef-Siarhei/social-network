import NewMessage from './NewMessage';
import {
  sendNewMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from '../../../../redux/reduced/messages-reducer';

export default function NewMessageContainer(props) {
  let newMessageText = props.store.getState().messagesPage.newMessageText;

  const sendMessage = () => {
    props.store.dispatch(sendNewMessageActionCreator());
  };
  const changeMessage = (text) => {
    props.store.dispatch(updateNewMessageBodyActionCreator(text));
  };
  return (
    <NewMessage
      newMessageText={newMessageText}
      sendMessage={sendMessage}
      changeMessage={changeMessage}
    />
  );
}
