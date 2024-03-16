import { connect } from 'react-redux';
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  unFollow,
  setIsFetching,
} from '../../redux/reduced/users-reducer';
import React from 'react';
import axios from 'axios';
import Users from './Users';
import Preloader from '../comoon/Preloader/Preloafer';

class UsersAPIContainer extends React.Component {
  componentDidMount() {
    this.props.setIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
      )
      .then((response) => {
        this.props.setIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount / 260);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.setIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`,
      )
      .then((response) => {
        this.props.setIsFetching(false);
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          totalUsersCount={this.props.totalUsersCount}
          users={this.props.users}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          onPageChanged={this.onPageChanged}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    isFetching: state.usersPage.isFetching,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unFollow: (userId) => {
//       dispatch(unFollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setTotalUsersCount: (usersCount) => {
//       dispatch(setTotalUsersCountAC(usersCount));
//     },
//     setIsFetching: (isFetching) => {
//       dispatch(setIsFetchingAC(isFetching));
//     },
//   };
// };

const UsersContainer = connect(mapStateToProps, {
  follow,
  unFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
})(UsersAPIContainer);

export default UsersContainer;
