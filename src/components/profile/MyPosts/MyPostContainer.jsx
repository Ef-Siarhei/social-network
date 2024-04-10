import MyPosts from './MyPosts';
import { addPost } from '../../../redux/reduced/profile-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostContainer = connect(mapStateToProps, { addPost })(MyPosts);

export default MyPostContainer;
