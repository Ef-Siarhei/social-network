import {connect} from 'react-redux';
import {
  follow,
  unFollow,
  requestUsers,
} from '../../redux/reduced/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import {
  getUsers,
  getPageSize,
  getCurrentPage,
  getTotalUsersCount,
  getIsFetching,
  getFollowingIsProgress,
} from '../../redux/selectors/users-selectors';
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
  users: Array<UserType>
  pageSize: number
  currentPage: number
  totalUsersCount: number
  isFetching: boolean
  followingIsProgress: Array<number>
}
type MapDispatchToPropsType = {
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  getUsers: (currentPage: number, pageSize: number) => void
}
type OwnPropsType = {
  pageTitle: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader/> : null}
        <h2>{this.props.pageTitle}</h2>
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

const mapStateToProps = (state: AppStateType):MapStateToPropsType => {
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
  // нажимаем Ctrl + b при курсоре на connect и смотрим какие уточнения можно добавить в <> в файле react-redux.d.ts
  // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unFollow,
    getUsers: requestUsers,
  }),
  withAuthNavigate,
)(UsersContainer);
