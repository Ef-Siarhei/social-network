import s from './users.module.css';
import userPhoto from '../../assets/images/woman.jpg';
import React from 'react';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

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

      <div className={s.btnNumberPages}>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p ? s.selectedPage : ''}
              key={p}
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>

      <button className={s.show_more}>Show more</button>
    </div>
  );
};

export default Users;
