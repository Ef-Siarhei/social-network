import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {
  addNewPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/reduced/profile-reducer';

export default function MyPosts(props) {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} like={p.like} key={p.id} />
  ));

  let addNewPost = () => {
    props.dispatch(addNewPostActionCreator());
  };

  let onPostChange = (event) => {
    let text = event.target.value;
    props.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <div>
        New post
        <div>
          <textarea onChange={onPostChange} value={props.newPostText} />
        </div>
        <div>
          <button onClick={addNewPost}>Add post</button>
        </div>
      </div>
      <div>{postsElements}</div>
    </div>
  );
}
