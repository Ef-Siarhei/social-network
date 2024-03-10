import NewMessage from './NewMessage';
import {
  sendNewMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from '../../../../redux/reduced/messages-reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    newMessageText: state.messagesPage.newMessageText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => dispatch(sendNewMessageActionCreator()),
    changeMessage: (text) => dispatch(updateNewMessageBodyActionCreator(text)),
  };
};

const NewMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessage);
export default NewMessageContainer;
