import s from './users.module.css';
import userPhoto from '../../assets/images/woman.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

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
              <NavLink to={`/profile/${user.id}`}>
                <img
                  src={user.photos.small ? user.photos.small : userPhoto}
                  alt=""
                  className={s.photo}
                />
              </NavLink>
              <div>
                {user.followed ? (
                  <button
                    className={s.on_off_Follow}
                    onClick={() => {
                      axios
                        .delete(
                          `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                          {
                            withCredentials: true,
                            // work without key!!!
                            // headers: {
                            //   'API-KEY': '59a8c29a-9be7-4874-919c-a8a3bc4e3776',
                            // },
                          },
                        )
                        .then((response) => {
                          if (response.data.resultCode === 0) {
                            props.unFollow(user.id);
                          }
                        });
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={s.on_off_Follow}
                    onClick={() => {
                      axios
                        .post(
                          `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                          {},
                          {
                            withCredentials: true,
                            // headers: {
                            //   'API-KEY': '59a8c29a-9be7-4874-919c-a8a3bc4e3776',
                            // },
                          },
                        )
                        .then((response) => {
                          if (response.data.resultCode === 0) {
                            props.follow(user.id);
                          }
                        });
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
