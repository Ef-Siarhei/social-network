import React, {FC} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required,} from '../../../utils/validators/validators';
import {createField, Textarea} from '../../common/FormsControl/FormsControl';
import {PostType} from "../../../types/types";


type FormDataType = {
  newPostText: string;
}
type FormDataKeyType = keyof FormDataType

type OwnPropsType = {
  posts: Array<PostType>;
  addPost: (postText: string) => void;
}

const maxLength100 = maxLengthCreator(100);

const AddNewPostForm: FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<FormDataKeyType>('Enter tour post', 'newPostText', [required, maxLength100], Textarea)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};
const AddNewPostReduxForm = reduxForm<FormDataType>({form: 'profileAddNewPostForm'})(AddNewPostForm);


class MyPosts extends React.Component<OwnPropsType> {
  postsElements = () => {
    return [...this.props.posts].reverse().map((p) => (
      <Post message={p.message} like={p.like} key={p.id}/>
    ));
  };

  onSubmit = (formData: FormDataType) => {
    this.props.addPost(formData.newPostText);
  };

  render() {
    return (
      <div className={s.myPosts}>
        <h3>My posts</h3>
        <AddNewPostReduxForm onSubmit={this.onSubmit}/>
        <div>{this.postsElements()}</div>
      </div>
    );
  }
}

export default MyPosts
