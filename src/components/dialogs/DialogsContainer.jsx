import { connect } from 'react-redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
  };
};

let AuthNavigateComponent = withAuthNavigate(Dialogs);

const DialogsContainer = connect(mapStateToProps)(AuthNavigateComponent);
export default DialogsContainer;
