import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPosts/MyPostContainer';
import Preloader from '../common/Preloader/Preloader';
import {ProfileType} from "../../types/types";
import {FC} from "react";

type OwnPropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  profileUpdateStatus: string
  updateUserStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (profile: ProfileType) => void
  setProfileStatusEdit: (status: 'edit' | 'success' | 'error') => void
}

const Profile: FC<OwnPropsType> = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        profileUpdateStatus={props.profileUpdateStatus}
        setProfileStatusEdit={props.setProfileStatusEdit}
      />
      <MyPostContainer />
    </>
  );
}

export default Profile
