import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

export default function MyPosts(props) {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} like={p.like} key={p.id} />
  ));

  let newPostElement = React.createRef();

  let addPost = () => {
    let text = newPostElement.current.value;
    alert(text);
  };

  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <div>
        New post
        <div>
          <textarea ref={newPostElement} />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div>{postsElements}</div>
    </div>
  );
}
