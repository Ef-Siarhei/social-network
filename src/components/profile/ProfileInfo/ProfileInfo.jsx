import s from './ProfileInfo.module.css';
import Contacts from './Contacts/Contacts';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
// import UserIcon from '../../common/UserIcon/UserIcon';
import noIconUser from '../../../assets/images/noIconUser.svg';
//
export default function ProfileInfo(props) {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div>
        <img
          className={s.img_1}
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          alt=""
        />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large || noIconUser} alt={''} className={s.icon}/>
        {/*<UserIcon img={props.profile.photos.large} />*/}

        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

        <div style={{ fontSize: 30 }}>{props.profile.fullName}</div>

        <ProfileStatusWithHooks
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />

        <div>About me: {props.profile.aboutMe}</div>

        <Contacts contacts={props.contacts} />
      </div>
    </div>
  );
}
