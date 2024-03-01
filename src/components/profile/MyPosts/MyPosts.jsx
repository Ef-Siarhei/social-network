import s from "./MyPosts.module.css";
import Post from "./Post/Post";

export default function MyPosts() {
  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <div>New post
        <div><textarea/></div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div>
        <Post message="Hi, how are you?" like="5"/>
        <Post message="It's my first post." like="20"/>
      </div>
    </div>
  );
}
