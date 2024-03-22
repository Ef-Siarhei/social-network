import { connect } from 'react-redux';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
    isAuth: state.auth.isAuth,
  };
};

const DialogsContainer = connect(mapStateToProps)(Dialogs);
export default DialogsContainer;
