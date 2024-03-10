import MyPosts from './MyPosts';
import {
  addNewPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/reduced/profile-reducer';

const MyPostContainer = (props) => {
  let profilePage = props.store.getState().profilePage;

  let addPost = () => {
    props.store.dispatch(addNewPostActionCreator());
  };

  let changePost = (text) => {
    props.store.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <MyPosts
      profilePage={profilePage}
      addPost={addPost}
      changePost={changePost}
    />
  );
};
export default MyPostContainer;
