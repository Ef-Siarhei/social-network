import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

export default function MyPosts(props) {
  let postsElements = props.profilePage.posts.map((p) => (
    <Post message={p.message} like={p.like} key={p.id} />
  ));

  let onAddNewPost = () => {
    props.addPost();
  };

  let onPostChange = (event) => {
    let text = event.target.value;
    props.changePost(text);
  };

  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <div>
        New post
        <div>
          <textarea
            onChange={onPostChange}
            value={props.profilePage.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddNewPost}>Add post</button>
        </div>
      </div>
      <div>{postsElements}</div>
    </div>
  );
}
