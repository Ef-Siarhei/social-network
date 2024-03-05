import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

export default function Profile(props) {
  return (
    <>
      <ProfileInfo />
      <MyPosts posts={props.posts} addPost={props.addPost} />
    </>
  );
}
