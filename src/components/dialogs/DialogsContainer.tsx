import { connect } from 'react-redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import {AppStateType} from "../../redux/redux-store";
import {DialogsType, MessagesType} from "../../redux/reduced/messages-reducer";

type MapStateToPropsType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: state.messagesPage.dialogs,
    messages: state.messagesPage.messages,
  };
};

export default compose(connect(mapStateToProps), withAuthNavigate)(Dialogs);
