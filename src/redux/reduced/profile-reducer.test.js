import profileReducer, { addNewPostActionCreator } from './profile-reducer';

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
