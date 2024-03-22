import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import Preloader from '../comoon/Preloader/Preloafer';
import { getUserProfile } from '../../redux/reduced/profile-reducer';
import { useParams } from 'react-router-dom';
import withAuthNavigate from '../../hoc/withAuthNavigate';

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
      userId = 2;
    }
    this.props.getUserProfile(userId);
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

let AuthNavigateComponent = withAuthNavigate(ProfileContainer);

let WithUrlDataContainerComponent = withRouter(AuthNavigateComponent);

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

export default connect(mapStateToProps, {
  getUserProfile,
})(WithUrlDataContainerComponent);

// export default connect(mapStateToProps, {
//   getUserProfile,
// })(withRouter(withAuthNavigate(ProfileContainer)));
