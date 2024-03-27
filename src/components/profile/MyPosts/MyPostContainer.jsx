import MyPosts from './MyPosts';
import { addNewPostActionCreator } from '../../../redux/reduced/profile-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postText) => dispatch(addNewPostActionCreator(postText)),
  };
};

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostContainer;
