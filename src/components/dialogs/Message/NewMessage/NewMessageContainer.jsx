import NewMessage from './NewMessage';
import { sendMessage } from '../../../../redux/reduced/messages-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {};
};

export default compose(connect(mapStateToProps, { sendMessage }))(NewMessage);
