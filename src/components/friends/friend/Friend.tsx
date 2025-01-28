import s from './Friend.module.css';
import {FriendType} from "../../../redux/reduced/sidebar-reducer";

type OwnPropsType = {
  friend: FriendType
  key: number
}

export default function Friend(props: OwnPropsType) {
  return (
    <div className={s.friend}>
      <img src={props.friend.icon} alt="" className={s.friend_img} />
      <div className={s.friend_name}>{props.friend.name}</div>
    </div>
  );
}
