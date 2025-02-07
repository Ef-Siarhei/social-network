import {connect} from 'react-redux';
import Friends from './Friends';
import {AppStateType} from "../../redux/redux-store";
import {getIsAuth} from "../../redux/selectors/profile-selectors";
import {FC, useEffect} from "react";
import {getFriends} from "../../redux/reduced/sidebar-reducer";
import {
  getFriendsSel,
  getPortionFriendsNumber,
  getPortionFriendsSize,
  getShowFriends
} from "../../redux/selectors/sidebar-selectors";

const FriendsContainer: FC<PropsType> = (props) => {
  const {getFriends, portionFriendsNumber, portionFriendsSize, showFriends, friends, isAuth} = props

  useEffect(() => {
    getFriends(portionFriendsNumber, portionFriendsSize, showFriends)
  }, [portionFriendsNumber, portionFriendsSize, showFriends])

  if (isAuth) {
    return <Friends friends={friends}/>
  }
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
  getFriends: (currentPage: number, pageSize: number, friends: null | boolean) => void
  portionFriendsNumber: number
  portionFriendsSize: number
  showFriends: boolean
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType) => {
  return {
    friends: getFriendsSel(state),
    isAuth: getIsAuth(state),
    portionFriendsNumber: getPortionFriendsNumber(state),
    portionFriendsSize: getPortionFriendsSize(state),
    showFriends: getShowFriends(state)
  };
};

export default connect(mapStateToProps, {getFriends})(FriendsContainer);

