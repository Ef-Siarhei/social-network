import s from './MyPosts.module.css';
import Post from './Post/Post';

let postData = [
  { id: 1, message: 'Hi, how are you?', like: '5' },
  { id: 2, message: "It's my first post.", like: '20' },
];

let posts = postData.map((p) => (
  <Post message={p.message} like={p.like} key={p.id} />
));

export default function MyPosts() {
  return (
    <div className={s.myPosts}>
      <h3>My posts</h3>
      <div>
        New post
        <div>
          <textarea />
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div>{posts}</div>
    </div>
  );
}
