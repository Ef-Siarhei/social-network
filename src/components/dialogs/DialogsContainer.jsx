import { connect } from 'react-redux';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
  };
};

const DialogsContainer = connect(mapStateToProps)(Dialogs);
export default DialogsContainer;
