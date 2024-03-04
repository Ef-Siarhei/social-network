import Friend from './friend/Friend';
import s from './Friends.module.css';

export default function Friends(props) {
  let friendsElements = props.friends.map((friend) => {
    return <Friend friend={friend} key={friend.id} />;
  });

  return (
    <div className={s.friends}>
      Friends
      <div className={s.friends_items}>{friendsElements}</div>
    </div>
  );
}
