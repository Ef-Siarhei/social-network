const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', like: '5' },
    { id: 2, message: "It's my first post.", like: '20' },
  ],
  newPostText: 'it-kamasutra',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: 3,
        message: state.newPostText,
        like: '0',
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }

    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText,
      };
    }

    default:
      return state;
  }
};

export const addNewPostActionCreator = () => ({
  type: ADD_POST,
});

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export default profileReducer;
