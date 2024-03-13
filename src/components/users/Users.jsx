import axios from 'axios';
import s from './users.module.css';
import userPhoto from './../../assets/images/woman.jpg';

const Users = (props) => {
  const getUsers = () => {
    if (props.users.length === 0) {
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users')
        .then((response) => {
          props.setUsers(response.data.items);
        });
    }
  };

  return (
    <div className={s.users}>
      {props.users.map((user) => {
        return (
          <div className={s.user} key={user.id}>
            <div className={s.user_icon_btn_block}>
              <img
                src={user.photos.small ? user.photos.small : userPhoto}
                alt=""
                className={s.photo}
              />
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
              <div>{user.name}</div>
              <div className={s.status}>{user.status}</div>
              <div className={s.country}>{'user.location.country'}</div>
              <div className={s.city}>{'user.location.city'}</div>
            </div>
          </div>
        );
      })}

      <button onClick={getUsers} className={s.show_more}>
        Show more
      </button>
    </div>
  );
};
export default Users;
