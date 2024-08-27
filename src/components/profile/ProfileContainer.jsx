import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto
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

  refreshProfile() {
    let userId = this.props.params['userId'];
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.params['userId'] !== prevProps.params['userId']){
      this.refreshProfile();
    }
  }

  render() {
    return (
      <>
        <Profile {...this.props}
        isOwner={!this.props.params['userId']}
        savePhoto={this.props.savePhoto}/>
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
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto }),
  withRouter,
  withAuthNavigate,
)(ProfileContainer);
