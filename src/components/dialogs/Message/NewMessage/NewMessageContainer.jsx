import NewMessage from './NewMessage';
import {
  changeMessage,
  sendMessage,
} from '../../../../redux/reduced/messages-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    newMessageText: state.messagesPage.newMessageText,
  };
};

export default compose(
  connect(mapStateToProps, { sendMessage, changeMessage }),
)(NewMessage);
