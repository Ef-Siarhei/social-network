import style from './users.module.css';
import React, {FC} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from "../../types/types";

type PropsType = {
  users: Array<UserType>
  pageSize:number
  currentPage: number
  totalUsersCount: number
  followingIsProgress: Array<number>
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
}

const Users: FC<PropsType> = (props) => {
  return (
    <div className={style.users}>
      {props.users.map((user: UserType) => {
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

      <button className={style.show_more}>Show more</button>
    </div>
  );
};

export default Users;
