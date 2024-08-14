import s from './users.module.css';
import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = (props) => {
  return (
    <div className={s.users}>
      {props.users.map((user) => {
        return (
          <User
            user={user}
            key={user.id}
            followingIsProgress={props.followingIsProgress}
            follow={props.follow}
            unFollow={props.unFollow}
          />
        );
      })}

      <Paginator
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />

      <button className={s.show_more}>Show more</button>
    </div>
  );
};

export default Users;
