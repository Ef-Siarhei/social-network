import profileReducer, {
  addNewPostActionCreator,
  deletePostAC,
} from './profile-reducer';

// 1. test data
let state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', like: '5' },
    { id: 2, message: "It's my first post.", like: '20' },
  ],
};

test('length of posts should be incremented', () => {
  // 1. test data
  let action = addNewPostActionCreator('qwerty');

  // 2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
  // 1. test data
  let action = addNewPostActionCreator('qwerty');

  // 2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts[2].message).toBe('qwerty');
});

test('after deleting length of posts should be decrement', () => {
  // 1. test data
  let action = deletePostAC(2);
  // 2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(1);
});

test('after deleting length of posts should not be decrement if id incorrect', () => {
  // 1. test data
  let action = deletePostAC(20);
  // 2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(2);
});
