import { rerenderEntireTree } from '../render';

let state = {
  profilePage: {
    posts: [
      { id: 1, message: 'Hi, how are you?', like: '5' },
      { id: 2, message: "It's my first post.", like: '20' },
    ],
    newPostText: 'it-kamasutra',
  },
  messagesPage: {
    dialogs: [
      {
        id: 1,
        name: 'Roman',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595928_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-3.jpg',
      },
      {
        id: 2,
        name: 'Kat',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595964_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-12.jpg',
      },
      {
        id: 3,
        name: 'Olga',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595973_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-29.jpg',
      },
      {
        id: 4,
        name: 'Pasha',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595998_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-31.jpg',
      },
      {
        id: 5,
        name: 'Sergei',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595977_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-23.jpg',
      },
      {
        id: 6,
        name: 'Masha',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595983_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-26.jpg',
      },
    ],
    messages: [
      { id: 1, input: true, message: 'Hi, how are you?' },
      { id: 2, output: true, message: 'What is you do today?' },
      { id: 3, input: true, message: 'Come to me tomorrow.' },
      { id: 4, input: true, message: 'Pasha' },
      { id: 5, output: true, message: 'Sergei' },
      { id: 6, input: true, message: 'Masha' },
    ],
    newMessageText: 'New Message',
  },
  sidebar: {
    friends: [
      {
        id: 1,
        name: 'Roman',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595928_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-3.jpg',
      },
      {
        id: 2,
        name: 'Kat',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595964_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-12.jpg',
      },
      {
        id: 3,
        name: 'Olga',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595973_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-29.jpg',
      },

      {
        id: 4,
        name: 'Kat',
        icon: 'https://flomaster.top/uploads/posts/2023-10/thumbs/1697595964_flomaster-top-p-risunki-izvestnikh-lyudei-vkontakte-12.jpg',
      },
    ],
  },
};

export const addPost = () => {
  const newPost = {
    id: 3,
    message: state.profilePage.newPostText,
    like: '0',
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = '';
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};

export function addMessage() {
  let newMessage = {
    id: 7,
    output: true,
    message: state.messagesPage.newMessageText,
  };
  state.messagesPage.messages.push(newMessage);
  rerenderEntireTree(state);
}

export const updateNewMessageText = (newText) => {
  state.messagesPage.newMessageText = newText;
  rerenderEntireTree(state);
};

export default state;
