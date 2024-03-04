import s from './Friend.module.css';

export default function Friend(props) {
  console.log(props);

  return (
    <div className={s.friend}>
      wwww
      <img src="" alt="" className={s.friend_img} />
      <div className={s.friend_name}>www</div>
    </div>
  );
}
