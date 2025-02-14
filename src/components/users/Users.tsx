import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/reduced/users-reducer";
import {
  getCurrentPage,
  getFollowingIsProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter
} from "../../redux/selectors/users-selectors";
import {AppDispatch} from "../../redux/redux-store";
import {useNavigate} from "react-router-dom";
import {StringParam, useQueryParams} from "use-query-params";

const Users: FC = () => {
  const users = useSelector(getUsers)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const followingIsProgress = useSelector(getFollowingIsProgress)
  const filter = useSelector(getUsersFilter)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [search] = useQueryParams({
    term: StringParam,
    friend: StringParam,
    page: StringParam
  })

  useEffect(() => {
      const {term, friend, page} = search

      const actualPage = page ? Number(page) : currentPage

      let actualFilter = filter
      if (term) {
        actualFilter = {...actualFilter, term: term}
      }

      switch (friend) {
        case 'true':
          actualFilter = {...actualFilter, friend: 'true'}
          break
        case 'false':
          actualFilter = {...actualFilter, friend: 'false'}
          break
        case '':
          actualFilter = {...actualFilter, friend: 'null'}
          break
        case undefined:
          actualFilter = {...actualFilter, friend: 'null'}
          break
      }

      dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, []
  )

  useEffect(() => {
    navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
  }, [filter, currentPage])

  const onPageChanged = async (pageNumber: number) => {
    try {
      await dispatch(requestUsers(pageNumber, pageSize, filter));
    } catch (error) {
      console.error("Failed to change page:", error);
    }
  };

  const onFilterChanged = async (filter: FilterType) => {
    await dispatch(requestUsers(1, pageSize, filter))
  }

  const follow = async (userId: number) => {
    // @ts-ignore
    await dispatch(follow(userId))
  }

  const unFollow = async (userId: number) => {
    // @ts-ignore
    await dispatch(unFollow(userId))
  }

  const showMore = async () => {
    const nextPage = currentPage + 1;
    await dispatch(requestUsers(nextPage, pageSize, filter));
  };

  return (
    <div className={style.users}>

      <UsersSearchForm onFilterChanged={onFilterChanged}/>

      {users.map((user: UserType) => {
        return (
          <User
            user={user}
            key={user.id}
            followingIsProgress={followingIsProgress}
            follow={follow}
            unFollow={unFollow}
          />
        );
      })}

      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />

      <button className={style.show_more} onClick={showMore}>Show more</button>
    </div>
  );
}

export default Users
