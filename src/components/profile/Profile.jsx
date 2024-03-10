import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPosts/MyPostContainer';

export default function Profile(props) {
  return (
    <>
      <ProfileInfo />
      <MyPostContainer store={props.store} />
    </>
  );
}
