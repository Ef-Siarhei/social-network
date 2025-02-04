import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
  setProfileStatusEdit,
} from '../../redux/reduced/profile-reducer';
import {Params, useParams} from 'react-router-dom';
import withAuthNavigate from '../../hoc/withAuthNavigate';
import {compose} from 'redux';
import {
  getAuthorizedUserId,
  getIsAuth,
  getProfile,
  getStatus,
  getProfileUpdateStatus,
} from '../../redux/selectors/profile-selectors';
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type ParamsType = {
  params: Readonly<Params>
}
type MapStateToPropsType = {
  profile: ProfileType
  status: string
  authorizedUserId: number
  isAuth: boolean
  profileUpdateStatus: string
}
type MapDispatchToPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (profile: ProfileType) => void
  setProfileStatusEdit: (status: 'edit' | 'success' | 'error') => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & ParamsType

const withRouter = (WrappedComponent: React.ComponentType<PropsType>) => (props: PropsType) => {
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

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | undefined = Number(this.props.params['userId']);
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, /*prevState, snapshot*/) {
    if (this.props.params['userId'] !== prevProps.params['userId']) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <>
        <Profile
          {...this.props}
          isOwner={!this.props.params['userId']}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: getProfile(state),
  status: getStatus(state),
  authorizedUserId: getAuthorizedUserId(state),
  isAuth: getIsAuth(state),
  profileUpdateStatus: getProfileUpdateStatus(state)
});

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, ParamsType, AppStateType>(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
    setProfileStatusEdit
  }),
  withRouter,
  withAuthNavigate,
)(ProfileContainer);
