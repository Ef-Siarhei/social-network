import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
// import UserIcon from '../../common/UserIcon/UserIcon';
import noIconUser from '../../../assets/images/noIconUser.svg';
import React, {ChangeEvent, FC} from "react";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import {ProfileType} from "../../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {getProfileUpdateStatus} from "../../../redux/selectors/profile-selectors";
import {savePhoto, saveProfile} from "../../../redux/reduced/profile-reducer";
import {AppDispatch} from "../../../redux/redux-store";
import {ProfileDataFormFormik} from "./ProfileDataForm/ProfileDataFormFormik";

type OwnPropsType = {
  isOwner: boolean
  profile: ProfileType
}

const ProfileInfo: FC<OwnPropsType> = (props) => {

  const profileUpdateStatus = useSelector(getProfileUpdateStatus)

  const dispatch: AppDispatch = useDispatch()

  const onMainPhotoSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      await dispatch(savePhoto(e.target.files[0]))
    }
  }

  const onSubmit = async (formData: ProfileType) => {
    await dispatch(saveProfile(formData))
  }

  return (
    <div>
      <div className={s.div_img_1}>
        <img
          className={s.img_1}
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          alt=""
        />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos?.['large'] || noIconUser} alt={''} className={s.icon}/>
        {/*<UserIcon img={props.profile.photos?.large} />*/}
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

        <div style={{fontSize: 20}}>
          <b>Full name:</b> {props.profile.fullName}
        </div>

        <ProfileStatusWithHooks/>

        {profileUpdateStatus === 'edit' || profileUpdateStatus === 'error'
          ? <>
          {/*  <ProfileDataForm*/}
          {/*  initialValues={props.profile}*/}
          {/*  onSubmit={onSubmit}*/}
          {/*/>*/}
          <ProfileDataFormFormik/></>
          : <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
          />}
      </div>
    </div>
  );
}

export default ProfileInfo
