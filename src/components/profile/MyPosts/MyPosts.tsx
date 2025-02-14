import React, {FC} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required,} from '../../../utils/validators/validators';
import {createField, Textarea} from '../../common/FormsControl/FormsControl';
import {PostType} from "../../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../../redux/selectors/profile-selectors";
import {addPost} from "../../../redux/reduced/profile-reducer";
import {AppDispatch} from "../../../redux/redux-store";


type FormDataType = {
  newPostText: string;
}
type FormDataKeyType = keyof FormDataType


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


export function MyPosts() {
  const posts = useSelector(getPosts)
  const dispatch: AppDispatch = useDispatch()

  const postsElements = () => {
    return [...posts].reverse().map((p) => (
      <Post message={p.message} like={p.like} key={p.id}/>
    ));
  };

  const handlerSubmit = async (formData: FormDataType) => {
    await dispatch(addPost(formData.newPostText))
  };

  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <AddNewPostReduxForm onSubmit={handlerSubmit}/>
      <div>{postsElements()}</div>
    </div>
  );
}
