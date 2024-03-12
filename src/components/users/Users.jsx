import s from './users.module.css';

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        followed: true,
        fullName: 'Sergei',
        status: 'I am a boss!',
        location: { city: 'Minsk', country: 'Belarus' },
        photoURL:
          'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
      },
      {
        id: 2,
        followed: false,
        fullName: 'Dmitry',
        status: 'I am a little pig!',
        location: { city: 'Moscow', country: 'Russia' },
        photoURL:
          'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
      },
    ]);
  }

  return (
    <div className={s.users}>
      {props.users.map((user) => {
        return (
          <div className={s.user} key={user.id}>
            <div className={s.user_icon_btn_block}>
              <img src={user.photoURL} alt="" className={s.photo} />
              <div>
                {user.followed ? (
                  <button
                    className={s.on_off_Follow}
                    onClick={() => {
                      props.unFollow(user.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={s.on_off_Follow}
                    onClick={() => {
                      props.follow(user.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
            <div className={s.user_description}>
              <div>{user.fullName}</div>
              <div className={s.status}>{user.status}</div>
              <div className={s.country}>{user.location.country}</div>
              <div className={s.city}>{user.location.city}</div>
            </div>
          </div>
        );
      })}

      <button className={s.show_more}>Show more</button>
    </div>
  );
};
export default Users;
