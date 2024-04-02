import { connect } from 'react-redux';
import {
  follow,
  unFollow,
  requestUsers,
} from '../../redux/reduced/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import {
  getUsers,
  getPageSize,
  getCurrentPage,
  getTotalUsersCount,
  getIsFetching,
  getFollowingIsProgress,
} from '../../redux/selectors/users-selectors';
class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    totalUsersCount: getTotalUsersCount(state),
    isFetching: getIsFetching(state),
    followingIsProgress: getFollowingIsProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unFollow,
    requestUsers,
  }),
  withAuthNavigate,
)(UsersContainer);
