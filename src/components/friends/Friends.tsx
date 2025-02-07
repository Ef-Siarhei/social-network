import Friend from './friend/Friend';
import s from './Friends.module.css';
import {UserType} from "../../types/types";
import {FC} from "react";

type OwnPropsType = {
  friends: Array<UserType>
}

const Friends: FC<OwnPropsType> = (props) => {

  let friendsElements = props.friends.map((friend) => {
    return <Friend friend={friend} key={friend.id}/>;
  });

  return (
    <div className={s.friends}>
      Friends
      <div className={s.friends_items}>{friendsElements}</div>
    </div>
  )
}
export default Friends
