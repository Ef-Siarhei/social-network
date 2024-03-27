import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import {
  maxLengthCreator,
  required,
} from '../../../utils/validators/validators';
import { Textarea } from '../../comoon/FormsControl/FormsControl';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name={'newPostText'}
          component={Textarea}
          placeholder={'Enter tour post'}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};
const AddNewPostReduxForm = reduxForm({ form: 'profileAddNewPostForm' })(
  AddNewPostForm,
);

export default class MyPosts extends React.Component {
  postsElements = () => {
    return this.props.posts.map((p) => (
      <Post message={p.message} like={p.like} key={p.id} />
    ));
  };

  onSubmit = (formData) => {
    this.props.addPost(formData.newPostText);
  };

  render() {
    return (
      <div className={s.myPosts}>
        <h3>My posts</h3>
        <AddNewPostReduxForm onSubmit={this.onSubmit} />
        <div>{this.postsElements()}</div>
      </div>
    );
  }
}
