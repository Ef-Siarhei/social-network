import { connect } from 'react-redux';
import { follow, unFollow, getUsers } from '../../redux/reduced/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../comoon/Preloader/Preloafer';
import { compose } from 'redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          users={this.props.users}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          totalUsersCount={this.props.totalUsersCount}
          followingIsProgress={this.props.followingIsProgress}
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
    followingIsProgress: state.usersPage.followingIsProgress,
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unFollow,
    getUsers,
  }),
  withAuthNavigate,
)(UsersContainer);
