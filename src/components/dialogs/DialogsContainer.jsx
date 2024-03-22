import { connect } from 'react-redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import Dialogs from './Dialogs';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
  };
};

export default compose(connect(mapStateToProps), withAuthNavigate)(Dialogs);
