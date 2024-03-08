const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
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
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
        id: 7,
        output: true,
        message: state.newMessageText,
      };
      state.messages.push(newMessage);
      state.newMessageText = '';
      return state;

    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageText = action.newText;
      return state;

    default:
      return state;
  }
};

export const sendNewMessageActionCreator = () => ({
  type: SEND_MESSAGE,
});

export const updateNewMessageBodyActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  newText: text,
});

export default messagesReducer;
