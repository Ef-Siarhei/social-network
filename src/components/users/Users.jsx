import s from './users.module.css';
import userPhoto from '../../assets/images/woman.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';

const Users = (props) => {
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
                    disabled={props.followingIsProgress.some(
                      (id) => id === user.id,
                    )}
                    className={s.on_off_Follow}
                    onClick={() => {
                      props.unFollow(user.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingIsProgress.some(
                      (id) => id === user.id,
                    )}
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

      <Paginator
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />

      <button className={s.show_more}>Show more</button>
    </div>
  );
};

export default Users;
