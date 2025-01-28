import noIconUser from '../../../assets/images/noIconUser.svg';

type OwnPropsType = {
  img: string | null
}

export default function UserIcon(props: OwnPropsType) {
  let src = props.img ? props.img : noIconUser;

  return <img src={src} alt="" />;
}
