import p from "./MyPosts.module.css";
import Post from "./Post/Post";

export default function MyPosts() {
  return (
    <div>
      My posts
      <div>New post</div>
      <div className={p.posts}>
        <Post />
        <Post />
      </div>
    </div>
  );
}
