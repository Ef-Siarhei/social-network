import s from './users.module.css';
import userPhoto from '../../assets/images/woman.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';

const User = ({ user, ...props }) => {
  return (
    <div className={s.user}>
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
              disabled={props.followingIsProgress.some((id) => id === user.id)}
              className={s.on_off_Follow}
              onClick={() => {
                props.unFollow(user.id);
              }}
            >
              UnFollow
            </button>
          ) : (
            <button
              disabled={props.followingIsProgress.some((id) => id === user.id)}
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
};

export default User;
