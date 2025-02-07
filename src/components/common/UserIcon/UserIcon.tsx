import noIconUser from '../../../assets/images/noIconUser.svg';

type OwnPropsType = {
  src?: string
  className?: string
}

export default function UserIcon(props: OwnPropsType) {
  let src = props.src ? props.src : noIconUser;

  return <img src={src} className={props.className} alt="" />;
}
