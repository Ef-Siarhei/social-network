import s from './Friend.module.css';
import {UserType} from "../../../types/types";
import UserIcon from "../../common/UserIcon/UserIcon";

type OwnPropsType = {
  friend: UserType
  key: number
}

export default function Friend(props: OwnPropsType) {
  const srcImage = props.friend.photos.small !== null ? props.friend.photos.small : undefined
  return (
    <div className={s.friend} onClick={(e) => console.log(e)}>
      <UserIcon src={srcImage} className={s.friend_img}/>
      <div className={s.friend_name}>{props.friend.name}</div>
    </div>
  );
}
