import Friend from './friend/Friend';
import s from './Friends.module.css';
import {FC, useEffect} from "react";
import {
  getFriendsSel,
  getPortionFriendsNumber,
  getPortionFriendsSize,
  getShowFriends
} from "../../redux/selectors/sidebar-selectors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/redux-store";
import {getFriends} from "../../redux/reduced/sidebar-reducer";


export const Friends: FC = () => {
  const friends = useSelector(getFriendsSel)
  const portionFriendsNumber = useSelector(getPortionFriendsNumber)
  const portionFriendsSize = useSelector(getPortionFriendsSize)
  const showFriends = useSelector(getShowFriends)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getFriends(portionFriendsNumber, portionFriendsSize, '', showFriends))
  }, [portionFriendsNumber, portionFriendsSize, showFriends])


  let friendsElements = friends.map((friend) => {
    return <Friend friend={friend} key={friend.id}/>;
  });

  return (
    <div className={s.friends}>
      Friends
      <div className={s.friends_items}>{friendsElements}</div>
    </div>
  )
}
