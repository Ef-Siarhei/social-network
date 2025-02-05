import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPosts/MyPostContainer';
import Preloader from '../common/Preloader/Preloader';
import {ProfileType} from "../../types/types";
import {Params} from "react-router-dom";
import {FC} from "react";

type OwnPropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  authorizedUserId: number | null
  isAuth: boolean
  profileUpdateStatus: string
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  updateUserStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (profile: ProfileType) => void
  setProfileStatusEdit: (status: 'edit' | 'success' | 'error') => void
  params: Readonly<Params>
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
