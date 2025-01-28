import {connect} from 'react-redux';
import Friends from './Friends';
import {AppStateType} from "../../redux/redux-store";
import {FriendsType} from "../../types/types";

type MapStateToPropsType = {
  sidebar: FriendsType
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    sidebar: state.sidebar,
  };
};

const FriendsContainer= connect(mapStateToProps)(Friends);
export default FriendsContainer;
