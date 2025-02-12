import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPosts/MyPostContainer';
import Preloader from '../common/Preloader/Preloader';
import {FC} from "react";
import {useSelector} from "react-redux";
import {getProfile} from "../../redux/selectors/profile-selectors";

type OwnPropsType = {
  isOwner: boolean
}

const Profile: FC<OwnPropsType> = (props) => {

  const profile = useSelector(getProfile)

  if (!profile) {
    return <Preloader />;
  }

  return (
    <>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={profile}
      />
      <MyPostContainer />
    </>
  );
}

export default Profile
