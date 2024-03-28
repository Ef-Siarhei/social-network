import noIconUser from '../../../assets/images/noIconUser.svg';

export default function UserIcon(props) {
  let src = props.img ? props.img : noIconUser;

  return <img src={src} alt="" />;
}
