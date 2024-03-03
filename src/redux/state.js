let state = {
  profilePage: {
    posts: [
      { id: 1, message: 'Hi, how are you?', like: '5' },
      { id: 2, message: "It's my first post.", like: '20' },
    ],
  },
  messagesPage: {
    dialogs: [
      { id: 1, name: 'Roman' },
      { id: 2, name: 'Kat' },
      { id: 3, name: 'Olga' },
      { id: 4, name: 'Pasha' },
      { id: 5, name: 'Sergei' },
      { id: 6, name: 'Masha' },
    ],
    messages: [
      { id: 1, message: 'Hi, how are you?' },
      { id: 2, message: 'What is you do today?' },
      { id: 3, message: 'Come to me tomorrow.' },
      { id: 4, message: 'Pasha' },
      { id: 5, message: 'Sergei' },
      { id: 6, message: 'Masha' },
    ],
  },
};

export default state;
