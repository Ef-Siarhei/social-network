let store = {
  _state: {
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
  },
  _callSubscriber() {},

  getState() {
    return this._state;
  },

  addPost() {
    const newPost = {
      id: 3,
      message: this._state.profilePage.newPostText,
      like: '0',
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(this._state);
  },

  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },

  addMessage() {
    let newMessage = {
      id: 7,
      output: true,
      message: this._state.messagesPage.newMessageText,
    };
    this._state.messagesPage.messages.push(newMessage);
    this._state.messagesPage.newMessageText = '';
    this._callSubscriber(this._state);
  },

  updateNewMessageText(newText) {
    this._state.messagesPage.newMessageText = newText;
    this._callSubscriber(this._state);
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },
};

export default store;
