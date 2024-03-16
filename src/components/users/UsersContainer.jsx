import { connect } from 'react-redux';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unFollowAC,
} from '../../redux/reduced/users-reducer';
import React from 'react';
import axios from 'axios';
import Users from './Users';

class UsersAPIContainer extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount / 260);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`,
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <Users
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        totalUsersCount={this.props.totalUsersCount}
        users={this.props.users}
        follow={this.props.follow}
        unFollow={this.props.unFollow}
        onPageChanged={this.onPageChanged}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => dispatch(followAC(userId)),
    unFollow: (userId) => dispatch(unFollowAC(userId)),
    setUsers: (users) => dispatch(setUsersAC(users)),
    setCurrentPage: (pageNumber) => dispatch(setCurrentPageAC(pageNumber)),
    setTotalUsersCount: (usersCount) =>
      dispatch(setTotalUsersCountAC(usersCount)),
  };
};

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersAPIContainer);

export default UsersContainer;
