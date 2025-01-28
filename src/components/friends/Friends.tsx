import Friend from './friend/Friend';
import s from './Friends.module.css';
import {FriendsType} from "../../types/types";
import {FC} from "react";

type OwnPropsType = {
  sidebar: FriendsType
}

const Friends: FC<OwnPropsType> = (props) => {
  let friendsElements = props.sidebar.friends.map((friend) => {
    return <Friend friend={friend} key={friend.id}/>;
  });

  return (
    <div className={s.friends}>
      Friends
      <div className={s.friends_items}>{friendsElements}</div>
    </div>
  );
}
export default Friends
