import s from './Friend.module.css';

export default function Friend(props) {
  return (
    <div className={s.friend}>
      <img src={props.friend.icon} alt="" className={s.friend_img} />
      <div className={s.friend_name}>{props.friend.name}</div>
    </div>
  );
}
