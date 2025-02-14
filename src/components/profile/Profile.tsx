import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../common/Preloader/Preloader';
import {FC} from "react";
import {useSelector} from "react-redux";
import {getProfile} from "../../redux/selectors/profile-selectors";
import {MyPosts} from "./MyPosts/MyPosts";

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
      <MyPosts />
    </>
  );
}

export default Profile
