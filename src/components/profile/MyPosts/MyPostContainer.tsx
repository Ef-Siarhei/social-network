import MyPosts from './MyPosts'
import {addPost} from '../../../redux/reduced/profile-reducer'
import {connect} from 'react-redux'
import {AppStateType} from "../../../redux/redux-store"
import {PostType} from "../../../types/types"

type MapStateToPropsType = {
  posts: Array<PostType>
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostContainer = connect(mapStateToProps, { addPost })(MyPosts)

export default MyPostContainer;
