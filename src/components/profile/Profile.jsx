import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPosts/MyPostContainer';
import Preloader from '../common/Preloader/Preloader';

export default function Profile(props) {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <>
      <ProfileInfo
        {...props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostContainer />
    </>
  );
}
