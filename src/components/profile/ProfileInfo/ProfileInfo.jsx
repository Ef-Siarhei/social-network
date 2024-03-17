import s from './ProfileInfo.module.css';
import Contacts from './Contacts/Contacts';

export default function ProfileInfo(props) {
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
        <img className={s.avatar} src={props.photos.small} alt="" />
        <div style={{ fontSize: 30 }}>{props.fullName}</div>
        <div>About me: {props.aboutMe}</div>
        <Contacts contacts={props.contacts} />
      </div>
    </div>
  );
}
