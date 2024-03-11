import s from './users.module.css';

const Users = (props) => {
  // if (props.users.length === 0) {
  //   props.setUsers([
  //     {
  //       id: 1,
  //       followed: true,
  //       fullName: 'Sergei',
  //       status: 'I am a boss!',
  //       location: { city: 'Minsk', country: 'Belarus' },
  //       photoURL:
  //         'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
  //     },
  //     {
  //       id: 2,
  //       followed: false,
  //       fullName: 'Dmitry',
  //       status: 'I am a little pig!',
  //       location: { city: 'Moscow', country: 'Russia' },
  //       photoURL:
  //         'https://vz.cnwimg.com/thumb-400x400/wp-content/uploads/2020/01/katy-perry2.jpg',
  //     },
  //   ]);
  // }

  return (
    <div>
      {props.users.map((user) => {
        return (
          <div key={user.id}>
            <span>
              <div>
                <img src={user.photoURL} alt="" className={s.photo} />
              </div>
              <div>
                {user.followed ? (
                  <button
                    onClick={() => {
                      props.unFollow(user.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      props.follow(user.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{user.fullName}</div>
                <div>{user.status}</div>
              </span>
              <span>
                <div>{user.location.country}</div>
                <div>{user.location.city}</div>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default Users;
