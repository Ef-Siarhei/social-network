import MyPosts from './MyPosts';
import {
  addNewPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/reduced/profile-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => dispatch(addNewPostActionCreator()),
    changePost: (text) => dispatch(updateNewPostTextActionCreator(text)),
  };
};

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostContainer;
