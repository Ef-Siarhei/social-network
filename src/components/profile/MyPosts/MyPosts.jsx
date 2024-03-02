import s from "./MyPosts.module.css";
import Post from "./Post/Post";


export default function MyPosts() {
let postData = [
  {id: 1, message: 'Hi, how are you?', like: '5'},
  {id: 2, message: 'It\'s my first post.', like: '20'},
]
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
        <Post message={postData[0].message} like={postData[0].like}/>
        <Post message={postData[1].message} like={postData[1].like}/>
      </div>
    </div>
  );
}
