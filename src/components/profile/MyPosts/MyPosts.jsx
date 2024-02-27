import p from "./MyPosts.module.css";
import Post from "./Post/Post";

export default function MyPosts(props) {
  return (
    <div>
      My posts
      <div>New post</div>
      <div className={p.posts}>
        <Post message="Hi, how are you?" like="5" />
        <Post message="It's my first post." like="20" />
      </div>
    </div>
  );
}
