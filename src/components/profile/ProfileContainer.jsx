import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import axios from 'axios';
import Preloader from '../comoon/Preloader/Preloafer';
import { setUserProfile } from '../../redux/reduced/profile-reducer';

class ProfileContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Profile {...this.props} />;
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

export default connect(mapStateToProps, {
  setUserProfile,
})(ProfileContainer);
