import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {
  addNewPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/state';

export default function MyPosts(props) {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} like={p.like} key={p.id} />
  ));

  let newPostElement = React.createRef();

  let addNewPost = () => {
    props.disPatch(addNewPostActionCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.disPatch(updateNewPostTextActionCreator(text));
  };

  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <div>
        New post
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={addNewPost}>Add post</button>
        </div>
      </div>
      <div>{postsElements}</div>
    </div>
  );
}
