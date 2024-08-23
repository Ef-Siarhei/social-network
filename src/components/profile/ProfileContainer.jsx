import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
} from '../../redux/reduced/profile-reducer';
import { useParams } from 'react-router-dom';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import {
  getAuthorizedUserId,
  getIsAuth,
  getProfile,
  getStatus,
} from '../../redux/selectors/profile-selectors';

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks
  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    return (
      <>
        <Profile {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: getProfile(state),
  status: getStatus(state),
  authorizedUserId: getAuthorizedUserId(state),
  isAuth: getIsAuth(state),
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  withAuthNavigate,
)(ProfileContainer);
